import express from 'express';
import { Axios } from '../../core/axios';
import { User, Code } from '../../models';
import { generateRandomCode } from '../../utils/generateRandomCode';

class AuthController {
  getMe(req: express.Request, res: express.Response) {
    res.json(req.user);
  }

  authCallback(req: express.Request, res: express.Response) {
    res.send(
      `<script>window.opener.postMessage('${JSON.stringify(
        req.user,
      )}', '*');window.close();</script>`,
    );
  }

  async activate(req: express.Request, res: express.Response) {
    const userId = req.user.id;
    const { code, user } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Invalid sms code' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Not user' });
    }

    const whereQuery = { code, user_id: userId };

    try {
      const findCode = await Code.findOne({
        where: whereQuery,
      });

      if (findCode) {
        await User.update({ ...user, isActive: 1 }, { where: { id: userId } });
        await Code.destroy({
          where: whereQuery,
        });
        return res.send();
      } else {
        throw new Error('User not found🤦‍♂️');
      }
    } catch (error) {
      res.status(500).json({
        message: 'Activation error😢',
      });
    }
  }

  async getUserInfo(req: express.Request, res: express.Response) {
    const userId = req.params.id;

    try {
      const findUser = await User.findByPk(userId);

      if (findUser) {
        res.json(await findUser);
      } else {
        throw new Error('User not found🤦‍♂️');
      }
    } catch (error) {
      res.status(500).json({
        message: 'User information retrieval error😢',
      });
    }
  }

  async sendSms(req: express.Request, res: express.Response) {
    const phone = req.query.phone;
    const userId = req.user.id;
    const smsCode = generateRandomCode();

    if (!phone) {
      return res.status(400).json({
        message: 'Invalid phone',
      });
    }

    try {
      await Axios.get(
        `https://sms.ru/sms/send?api_id=${process.env.SMS_API_KEY}&to=${phone}&msg=code:${smsCode}`,
      );

      const findCode = await Code.findOne({
        where: {
          user_id: userId,
        },
      });

      if (findCode) {
        return res.status(400).json({ message: 'Has already been sent' });
      }

      await Code.create({
        code: smsCode,
        user_id: userId,
      });
      res.status(201).send();
    } catch (error) {
      res.status(500).json({
        message: 'The text code was not sent😢',
      });
    }
  }
}

export default new AuthController();

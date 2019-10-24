import * as Yup from 'yup';

import Skill from '../models/Skill';
import SkillArea from '../models/SkillArea';

class SkillController {
  async index(req, res) {
    const skills = await Skill.findAll({
      order: ['id'],
      include: {
        model: SkillArea,
        as: 'area',
        attributes: ['id', 'title'],
      },
      attributes: ['id', 'title'],
    });

    return res.json(skills);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      area_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id, title, area_id } = await Skill.create(req.body);

    return res.json({ id, title, area_id });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      area_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id: pk } = req.params;

    const area = await Skill.findByPk(pk);

    if (!area) {
      return res
        .status(400)
        .json({ error: 'Area with id provided does not exists.' });
    }

    const { id, title, area_id } = await area.update(req.body);

    return res.json({ id, title, area_id });
  }
}

export default new SkillController();

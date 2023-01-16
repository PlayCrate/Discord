import Joi from "joi";

export const ConfigSchema = Joi.object({
     token: Joi.string().required(),
     client_id: Joi.string().required(),
     type: Joi.string().required(),
     guilds: Joi.array().items(Joi.string()).required(),
     refresh_time: Joi.number().required()
});

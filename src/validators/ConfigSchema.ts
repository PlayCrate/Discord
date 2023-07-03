import Joi from "joi";

export const ConfigSchema = Joi.object({
     token: Joi.string().required(),
     client_id: Joi.string().required(),
     type: Joi.string().required(),
     guilds: Joi.array().items(Joi.string()).required(),
     authorization: Joi.string().required(),
     adminChannels: Joi.array().items(Joi.string()).required(),
     DEBUG: Joi.boolean().required(),
     DEBUG_TESTERS: Joi.array().items(Joi.string()).required()
});

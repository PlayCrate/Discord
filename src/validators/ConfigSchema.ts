import Joi from "joi";

export const ConfigSchema = Joi.object({
     token: Joi.string().required(),
     client_id: Joi.string().required(),
     type: Joi.string().required()
});

import { userCreateSchema, userUpdateSchema } from "../validation/userValidation.js";
import { validateSchema } from "../utils/validator/validator.js";
import wrapper from "../utils/wrapper/wrapper.js";
import userService from '../services/userService.js'
import httpCode from "../utils/constant/httpCode.js";

const createUser = async (req, res)=>{
  const payload = req.body;
  const checkValidation = validateSchema(userCreateSchema, payload);
  const postRequest = async(result)=>{
    if (result.err) {
      return result
    }
    return userService.createUser(result);
  }
  const sendResponse = async(result)=>{
    (result.err) ? wrapper.response(res, 'fail', result, 'Failed create user', httpCode.INTERNAL_SERVER)
      : wrapper.response(res, 'success', result, 'Success create user', httpCode.CREATED);
  };
  sendResponse(await postRequest(checkValidation));
}

const updateUser = async (req, res)=>{
  const payload = {id: req.params.id, ...req.body};
  const checkValidation = validateSchema(userUpdateSchema, payload);
  const postRequest = async(result)=>{
    if (result.err) {
      return result
    }
    return userService.updateUser(result);
  }
  const sendResponse = async(result)=>{
    (result.err) ? wrapper.response(res, 'fail', result, 'Failed update user', httpCode.INTERNAL_SERVER)
      : wrapper.response(res, 'success', result, 'Success update user', httpCode.OK);
  };
  sendResponse(await postRequest(checkValidation));
}

export default {
  createUser,
  updateUser
}
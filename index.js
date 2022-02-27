
const util = require('./utils/util');
const healthPath = '/health';
const addTaskPath = '/addtask';
const getTaskPath = '/gettasks';
const deleteTaskPath = '/deletetask';
const registerPath = '/register';
const loginPath = '/login';
const verifyPath = '/verify';
const todoService = require('./service/addtodo');
const getTaskService = require('./service/getTasks');
const deleteService = require('./service/deleteTask');
const registerService = require('./service/register');
const loginService = require('./service/login');
const verifyService =require('./service/verify');

exports.handler = async (event) => {
  console.log('Request Event: ', event);
  let response;
  switch(true){
    case event.httpMethod === 'GET' && event.path === healthPath: 
      response = util.buildResponse(200);
      break;
    case event.httpMethod === 'POST' && event.path === addTaskPath:
      const addtodoBody = JSON.parse(event.body);
      response = await todoService.addtodo(addtodoBody);
      break;
    case event.httpMethod === 'GET' && event.path === getTaskPath:
       response = await getTaskService.getTask();
      break;
    case event.httpMethod === 'POST' && event.path === deleteTaskPath:
      const deleteBody = JSON.parse(event.body);
      response = await deleteService.deleteTask(deleteBody);
      break;
    case event.httpMethod === 'POST' && event.path === registerPath:
      const registerBody = JSON.parse(event.body);
      response = await registerService.register(registerBody);
      break;  
    case event.httpMethod === 'POST' && event.path === loginPath:
        const loginBody = JSON.parse(event.body);
        response = await loginService.login(loginBody);
        break; 
    case event.httpMethod === 'POST' && event.path === verifyPath:
          const verifyBody = JSON.parse(event.body);
          response = verifyService.verify(verifyBody);
          break;  
    default:
      response = util.buildResponse(404, '404 Not Found');
  }
  return response;
};
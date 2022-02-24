
const util = require('./utils/util');
const healthPath = '/health';
const addTaskPath = '/addtask';
const getTaskPath = '/gettasks';
const todoService = require('./service/addtodo');
const getTaskService = require('./service/getTasks');
const deleteTaskPath = '/deletetask';
const deleteService = require('./service/deleteTask');

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
    default:
      response = util.buildResponse(404, '404 Not Found');
  }
  return response;
};

const {getQuestions, retrieveQuesData} = require('./quesList');
const Question = require('../model/questions');
const taskArray = [];

const storeQueue = (arr) => {
    taskArray.push(...arr);
};

let pageNo = 1;

const dataCrawler = async () => {
  const url = taskArray.shift();
  console.log("URL: ", url);
  const currentQuestion = await Question.findOne({ url });

  if (!currentQuestion) {
    await retrieveQuesData(url, pageNo, storeQueue);
  } else {
    currentQuestion.totalReferenceCount += 1;
    await currentQuestion.save();
    await getQuestions(pageNo + 1, storeQueue);
    pageNo += 1;
  }
};

module.exports = {
      webCrawler: async () => {
        await getQuestions(pageNo, storeQueue);
        while (taskArray.length > 0) {
          await dataCrawler();
          await dataCrawler();
          await dataCrawler();
          await dataCrawler();
          await dataCrawler();
        }
      },
};
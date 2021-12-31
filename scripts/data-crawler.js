const {getQuestions, retrieveQuesData} = require('./quesList');
const Question = require('../model/questions');
const taskArray = [];

const storeQueue = (arr) => {
    taskArray.push(...arr);
};

let pageNo = 1;

const dataCrawler = async () => {
  const quesUrl = taskArray.shift();
  console.log("URL: ", quesUrl);
  const currentQuestion = await Question.findOne({ quesUrl });

  if (!currentQuestion) {
    await retrieveQuesData(quesUrl, pageNo, storeQueue);
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
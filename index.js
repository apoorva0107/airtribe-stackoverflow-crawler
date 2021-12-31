require('./database');
const Question = require("./model/questions");
const {getQuestions, retrieveQuesData} = require('./quesList');
const taskArray = [];

const storeQueue = (arr) => {
    taskArray.push(...arr);
};

const crawlData = async () => {
  const url = taskArray.shift();
  console.log("URL: ", url);
  const currentQuestion = await Question.findOne({ url });

  if (!currentQuestion) {
    await retrieveQuesData(url, num, storeQueue);
  } else {
    currentQuestion.totalReferenceCount += 1;
    await currentQuestion.save();
    await getQuestions(num + 1, storeQueue);
    num += 1;
  }
};

let num = 1;
const crawler = async () => {
  await getQuestions(num, storeQueue);
  while (taskArray.length > 0) {
    await crawlData();
    await crawlData();
    await crawlData();
    await crawlData();
    await crawlData();
  }
};

crawler();

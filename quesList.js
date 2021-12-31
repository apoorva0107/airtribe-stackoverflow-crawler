const axios = require("axios");
const cheerio = require("cheerio");
const Question = require("./model/questions");

const {quesName,
    quesLink,
    quesAnswer,
    noAnswer,
    quesUpvotes,
    } = {
    quesName: "h1[itemprop=name]",
    quesUpvotes: ".js-vote-count",
    noAnswer: "div.no-answers",
    quesAnswer: "span[itemprop=answerCount]",
    quesLink: "h3>a.question-hyperlink",
};

module.exports = {
    getQuestions: async (pageNo, callBack) => {
        try {
        const html = await axios.get(
            `${process.env.HOST_QUESTION_ENDPOINT}${pageNo}`
        );
        const $ = cheerio.load(html.data);
        const tempQuestions = $(`${quesLink}`)
            .map((i, link) => `${process.env.URL}${link.attribs.href}`)
            .get();
        callBack(tempQuestions);
        } catch (error) {
        console.log("error encountered:", error);
        }
    },

    // getQuestions(1, storeQueue);
    retrieveQuesData : async (url, pageNo, callBack) => {
    try {
        const quesData = {
            quesUrl: url,
            quesRefCount: 1
        };
        const urlData = await axios.get(url);
        const $ = cheerio.load(urlData.data);
        quesData.quesName = $(`${quesName}`).text();
        quesData.quesTotalUpvotes = $(`${quesUpvotes}`).text().trim().split(" ")[0].trim();
        let quesNumAnswers = $(`${noAnswer}`).text().trim().split(" ")[0].trim();
        if (quesNumAnswers.length > 0) {
            quesData.quesTotalAnswers = 0;
        } else {
            quesData.quesTotalAnswers = $(`${quesAnswer}`).text();
        }
        await Question.create(quesData);
    } catch (error) {
        console.log("error encountered:", error);
    }
    }
};
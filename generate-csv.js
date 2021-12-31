const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Question = require("./model/questions");

const csvWriter = createCsvWriter({
  path: "data.csv",
  header: [
    { id: "quesUrl", title: "URL" },
    { id: "quesTotalUpvotes", title: "Total Upvotes" },
    { id: "quesTotalAnswers", title: "Total Answers" },
    { id: "quesRefCount", title: "Reference" },
  ],
});

const CSVgenerator = async (file) => {
  try {
    await csvWriter.writeRecords(file);
    console.log("CSV file created");
  } catch (error) {
    console.log("Error:", error);
  }
};

module.exports = {
    saveFile : async () => {
        try {
            const questionData = await Question.find();
            await CSVgenerator(questionData);
        } catch (error) {
            process.exit(1);
        }
        process.exit(1);
        }
};
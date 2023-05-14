const mentorReportPrompt = `Write a 450-word mentor report for an international school student, focusing on their performance in the beyond-classroom education IB CAS program, which includes creativity, activity, and service. Mention the student's name, classification, and introduction. The report should discuss the student's achievements in relation to the 7 learning outcomes from the CAS program. Make sure the report is grammatically correct, fits the given guidelines, and has a positive tone for the audience, who are parents.

Learning Outcomes:
1. Identify their own strengths and develop areas for growth.
2. Demonstrate that challenges have been undertaken, developing new skills in the process.
3. Demonstrate how to initiate and plan a CAS experience (Project Week)
4. Show commitment to and perseverance in CAS experiences
5. Demonstrate the skills and recognize the benefits of working collaboratively
6. Demonstrate engagement with issues of global significance
7. Recognize and consider the ethical implications of choices and actions
`;

const buildMentorReportPrompt = () =>
{
    return mentorReportPrompt;
}

module.exports = { buildMentorReportPrompt }; 
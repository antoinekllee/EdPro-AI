const systemPrompt = `Write a 450-word mentor report for an international school student, focusing on their performance in the beyond-classroom education IB CAS program, which includes creativity, activity, and service. Mention the student's name, classification, and introduction. The report should discuss the student's achievements in relation to the 7 learning outcomes from the CAS program. Make sure the report is grammatically correct, fits the given guidelines, and has a positive tone for the audience, who are parents.

Learning Outcomes:
1. Identify their own strengths and develop areas for growth.
2. Demonstrate that challenges have been undertaken, developing new skills in the process.
3. Demonstrate how to initiate and plan a CAS experience (Project Week)
4. Show commitment to and perseverance in CAS experiences
5. Demonstrate the skills and recognize the benefits of working collaboratively
6. Demonstrate engagement with issues of global significance
7. Recognize and consider the ethical implications of choices and actions`;

const exampleInput = `Name: John
CAS Experiences: Project 0, Badminton Team, Coding for Good, Coding Spring Hackathon, Circling Day, Music and Dementia, Environmentally Conscious Transportation Choices, Time Management
Skills and Qualities: Time Management, Leadership, Problem Solving, Adaptability, Empathy, Initiative, Ethical Decision Making`

const exampleOutput = `John is an intelligent and kind-hearted student who has made significant contributions to his school and community through a wide range of creative activities over the past 18 months. He has balanced his academic pursuits, athletic endeavors, and service work while consistently striving for personal growth and making a positive impact on those around him.
One of John's most notable accomplishments is his participation in "Project 0," a group-based project exploring the mathematical principles behind social distancing. Through this project, John deepened his understanding of mathematical concepts and developed valuable collaborative skills.
John has also been a dedicated member of his school's badminton team, effectively balancing the demands of rigorous training with his other responsibilities. Furthermore, as the Co-chair and Communication Officer for the service group "Coding For Good," he has used his technical skills to make a positive impact on his local community.
Some key moments that shaped John's experiences include the "Coding Spring" hackathon, the intense SAS badminton match, and the Circling day during his project week, where the group persevered through challenging weather and ultimately enjoyed their time together.
John's participation in various group activities has allowed him to develop project planning and management skills, identify his own strengths and areas for growth, and improve his leadership abilities. One of his most meaningful projects, "Music and Dementia," involved creating a website for music therapy targeted at dementia patients. John believes this project had a significant impact on the community as they developed a working prototype and learned the importance of listening to the client's needs.
Furthermore, John has been environmentally conscious during project weeks, opting for public transport, cycling, and walking instead of taking cabs. He recognizes the ethical and environmental implications of his choices and is dedicated to making a positive impact on the world around him.
One of John's most challenging goals has been maintaining his commitments to the CAS program, which has required effective scheduling and prioritization of his time. As a result, he has developed valuable time management skills.
In conclusion, John is a well-rounded and accomplished student deeply committed to making a positive impact on the world around him. His diverse experiences in academics, athletics, and service have contributed to his personal growth and the lives of those around him. As John moves on to university next year, we are confident that he will be a great asset to his future institution, continuing to make a positive impact and demonstrating the same dedication and enthusiasm he has shown throughout his CAS program.`

module.exports = { systemPrompt, exampleInput, exampleOutput }; 
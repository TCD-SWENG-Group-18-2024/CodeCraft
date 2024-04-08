import Abdullah from '../assets/Abdullah.png';
import Ben from '../assets/Ben.jpg';
import FionnNew from '../assets/FionnNew.jpg';
import Gerard from '../assets/Gerard.png';
import Leah from '../assets/Leah.png';
import Lucia from '../assets/Lucia.jpg';
import Mariam from '../assets/Mariam.jpg';
import Patrick from '../assets/Patrick.jpg';
import Roy from '../assets/Roy.png';
import Wang from '../assets/Wang.jpg';
import Yuchen from '../assets/Yuchen.jpg';

const teamMembersData = [
    {
      id: 1,
      name: 'Fionn Murphy',
      role: 'Team Lead',
      year: '3rd',
      image: FionnNew,
      description: 'I\'m Fionn and I am the Team Leader for this project! I am a Third Year Computer Science student and I have extensive experience in programming with languages such as Java, Python, C, Assembly, JavaScript, HTML and CSS, as well as a lot of experience on software engineering projects! I\'ve participated in several game jams and hackathons, and my most recent project was building an AI-Powered Task Management Application with a group of friends for Hack Trinity. I\'m very excited to be working on this project with such an excellent team, and I can\'t wait to see where it goes in the future!'
    },
    {
      id: 2,
      name: 'Mariam María Quesada Ojeda',
      role: 'Integration Team Lead',
      year: '3rd',
      image: Mariam,
      description: 'I\'m Mariam and I am the Integration Team Lead for this project! I am a Third Year Computer Science Major and Business Minor student and I have experience in programming with languages such as Java, Python, C, Haskell, Assembly, ReactJS, JavaScript, HTML and CSS. I have worked on many other software engineering projects. For instance,  my SwEng project from last year where I collaborated with Mersus Technology, and another project where we created a Recipe Filtering Website. Additionally, I\'ve tackled various programming projects from my modules at Trinity. On the business side, I\'ve participated in numerous group projects involving entrepreneurship, marketing, and business planning. I\'m thoroughly enjoying this year\'s project, and I\'m eager to see the final product we\'ll deliver!'
      },
    {
      id: 3,
      name: 'Leah Weldon',
      role: 'Styling Team Lead',
      year: '3rd',
      image: Leah,
      description: 'I\'m Leah and I am the Styling Team Leader for this project! I am a 3rd year Computer Science student and I have experience in programming with languages such as Java, C, Python, Prolog, Haskell, R, Verilog, VHDL, ARM Assembly, ReactJS, Javascript, CSS and HTML. I have worked on other projects such as creating an App to explore data relating to artificial space objects, SwEng Project with Mersus Technology and developing a web application for a song guessing game. I have also took part in some Hackathons including one with JP Morgan in Glasgow! I\'m excited to be working on this project and can’t wait to see what we are able to produce:)'
    },
    {
      id: 4,
      name: 'Gerard Moylan',
      role: 'Backend Team Lead',
      year: '3rd',
      image: Gerard,
      description: 'I\'m Gerard and I\'m currently in 3rd year ICS. I\'m proficient in Java, Python and C and have experience with backend development using Java Spring Boot and Python Flask. I have worked on multiple projects in the past such as a web application for Cisco which crowdsources the most accurate translations for Webex.'
    },
    {
      id: 5,
      name: 'Roy Zheng',
      role: 'Styling Team',
      year: '3rd',
      image: Roy,
      description: 'I\'m Roy, currently in Third Year ICS. I\'m proficient in programming languages such as Java, C, Python and Javascript. I have participated in projects such as developing an AI chess game with Microsoft Hololens, and I also contributed to the creation of a SpringBoot weather application integrated with ReactJS.'
    },
    {
      id: 6,
      name: 'Ben Feeney',
      role: 'Backend Team',
      year: '3rd',
      image: Ben,
      description: 'I\'m Ben and I\'m a third year working as part of the Backend team. I have coding experience mainly in Java, Python and C. I have also worked on software development projects before - for example, last year I worked as part of a team on an application that provided similarity matching scores for different texts.'
    },
    {
      id: 7,
      name: 'Lucia Brown',
      role: 'Backend Team',
      year: '2nd',
      image: Lucia,
      description: 'I\'m Lucia in 2nd Year ICS and am on the Backend team for this project. My experience includes languages such as Python, C, Java, SQL, etc. Previous projects I\'ve worked on include my Leaving Certificate project where I used the BBC Microbit and Python to create an automated system for watering plants, and my group project from first year in ICS where we processed and displayed data and took user input to demonstrate which data to display.'
    },
    {
      id: 8,
      name: 'Yuchen Zhuang',
      role: 'Integration Team',
      year: '2nd',
      image: Yuchen,
      description: 'I am Yuchen/Paddy in 2nd Year ICS, and I am on the Frontend team for this project. I had experience with Java, C, HTML and CSS prior to this project. Last year I also worked with a team to develop an application using Processing.'
    },
    {
      id: 9,
      name: 'Wang Yinghao',
      role: 'Styling Team',
      year: '2nd',
      image: Wang,
      description: 'I am Wang Yinghao in 2nd Year CSB, and I am on the Frontend team ( styling team ) for this project. I had experience with Java, HTML and Arm Assembly, Python to this project. Last year I also worked with a team to develop an application using Processing.'
    },
    {
      id: 10,
      name: 'Patrick Archbold',
      role: 'Integration Team',
      year: '2nd',
      image: Patrick,
      description: 'I\'m Patrick in 2nd Year Integrated Computer Science at TCD working with the Backend team. I have experience in Java, C, Assembly language and Python. I was involved in a programming project where I represented data related to different flights and airports using Processing.'
    },
    {
      id: 11,
      name: 'Abdullah Khan',
      role: 'Backend Team',
      year: '2nd',
      image: Abdullah,
      description: 'I am Abdullah and I am on the backend team for this project. I am a 2nd Year Integrated Computer Science student. I have experience in Python, Java, C, and more. I have worked on several projects in the past, one includes an AI algorithm that can play board games. I also research state estimation on the Formula Trinity Autonomous team!'
    },
];

export default teamMembersData;

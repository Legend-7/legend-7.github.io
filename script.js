document.addEventListener('mousemove', (event) => {
  const screen = document.querySelector('.screen');
  const { clientX: mouseX, clientY: mouseY } = event;
  
  // Get the center of the screen
  const { innerWidth: width, innerHeight: height } = window;
  const centerX = width / 2;
  const centerY = height / 2;

  // Calculate tilt angles based on mouse position
  const tiltX = ((mouseY - centerY) / centerY) * 5; // Max tilt: 15 degrees
  const tiltY = ((mouseX - centerX) / centerX) * -5; // Max tilt: -15 degrees
const newX = tiltX + 10;
const newY = tiltY - 20;
  // Apply the transform
  screen.style.transform = `rotateY(${newY}deg) rotateX(${newX}deg)`;
});

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
  }
}

function showInfo(tileId) {
  const banner = document.querySelector('.banner');
  const detailsContent = document.getElementById('details-content');
  const detailsSection = document.querySelector('.details-section');

  // Clear previous content
  detailsContent.innerHTML = '';

  banner.style.height = '600px';
  // Define content for each tile
  const content = {
    'web-development': `
        <h2>Web Development</h2>
        <p>I specialize in creating modern, responsive websites that look great on all devices. My web development services include front-end, back-end, and full-stack development with a focus on performance and user experience.</p>
        <img src="/images/web-UI.jpg" alt="Web Development">
    `,
    'electron-apps': `
        <h2>Desktop Apps</h2>
        <p>I build cross-platform desktop applications using Electron, ensuring a seamless experience across Windows, macOS, and Linux. My Desktop apps are robust and feature-rich, with a native look and feel.</p>
        <img src="/images/app-UI.jpg" alt="Electron Apps">
    `,
    'blockchain-development': `
        <h2>Blockchain Development</h2>
        <p>I offer blockchain development services including smart contract development, decentralized applications (dApps), and integration with various blockchain platforms like Ethereum and Solana.</p>
        <img src="/images/sol.jpg" alt="Blockchain Development">
    `,
    'javascript-games': `
        <h2>JavaScript Games</h2>
        <p>I create engaging and interactive games using JavaScript and related technologies. My games are designed to be fun, addictive, and optimized for various devices and platforms.</p>
        <div style="display: flex; flex-direction: row; overflow-x:auto;">
          <img src="/images/crouton/broc_animator.jpg" alt="JavaScript Games">
          <img src="/images/xenix/1.jpg" alt="JavaScript Games">
        </div>
    `,
    'api-integration': `
        <h2>API Integration</h2>
        <p>I provide API integration services to connect applications with third-party services and APIs, enabling seamless data exchange and functionality enhancements for various projects.</p>
        <img src="/images/programming.jpg" alt="API Integration">
    `,
    'smart-contracts': `
        <h2>Smart Contracts</h2>
        <p>I design and deploy smart contracts to automate processes on blockchain platforms, ensuring transparency, security, and efficiency in transactions and operations.</p>
        <img src="/images/sol.jpg" alt="Smart Contracts">
    `,
    'chatbots': `
        <h2>Chatbots</h2>
        <p>I develop intelligent and responsive chatbots that handle customer inquiries, provide support, and enhance user interaction on various platforms.</p>
        <img src="/images/bot.png" alt="Chatbots">
    `
};


  // Populate details section with the relevant content
  detailsContent.innerHTML = content[tileId] || '<p>No details available.</p>';

  // Show the details section
  detailsSection.classList.add('show');
}



const projectData = {
  fae: {
      title: 'Fae Frameworks',
      text: `Fae Frameworks is a realm where creativity meets innovation, offering a rich tapestry of tools designed for the modern artist, developer, and gamer. At the heart of Fae lies a powerful game engine, a forge where immersive worlds and interactive experiences are crafted with precision and imagination.There are other tools as well including the animator, which breathes life into characters and stories with built in AI bots, allowing creators to weave intricate, dynamic stories that captivate and inspire. But Fae is more than just a collection of tools; it's a gateway to a vibrant community. The Fae Hub serves as both a sanctuary and a playground. Here, players can effortlessly navigate their library of games, all while connecting with others through the hub’s rich social features. In this space, creativity and connection intertwine, making Fae Frameworks a haven for gamers and creators alike.`,
      images: [
          '/images/fae_logo.png',
          '/images/fae/1.jpg',
          '/images/fae/2.jpg',
          '/images/fae/3.jpg',
          '/images/fae/engine.jpg',
          '/images/fae/hub.jpg',

      ],
      bullets: [
        'Game Authentication: Secure user authentication system using MongoDB for credential storage and JWT (JSON Web Tokens) for session management, ensuring protected and efficient user access.',
        'User Management: Comprehensive management of user accounts and permissions, powered by MongoDB for data storage and Node.js for backend processing.',
        'Chat System: Real-time communication tools utilizing WebSockets and Socket.io for low-latency messaging, enabling seamless in-game and social interactions.',
        'Content Management: Hosting and management of content like blog posts and game updates, backed by MongoDB and served via Express.js for efficient content delivery.',
        'Task Management: A structured system for assigning tasks, setting deadlines, and tracking progress, integrated into the Fae Hub with a React-based UI for user-friendly interaction.',
        'Bots/AI: Creation of interactive bots and AI-driven NPCs using Node.js, with optional API integration for advanced machine learning capabilities.',
        'Transaction/Economy: In-game transaction system supporting both traditional payments through Stripe API and blockchain transactions via Web3.js, ensuring secure and versatile payment options.',
        'Analytics: Tracking tools powered by Google Analytics API and custom metrics stored in MongoDB, providing insights into user behavior and game performance.',
        'Administrative/Moderation: Suite of tools for community management and moderation, built with Node.js and integrated with the user management system for full control over user interactions.'
    ]
    
  },
  eldermine: {
    title: 'Eldermine',
    text: 'A comprehensive mining pool site that supports a variety of cryptocurrencies, offering a range of tools and resources for miners. The site features a complete frontend design, educational resources for miners, a support chatbot, token price checking API, and mining software for managing rigs and miners.',
    images: [
        '/images/eldermine.png',
        '/images/elder/miner.jpg',
        '/images/elder/1.jpg',
        '/images/elder/2.jpg'
    ],
    bullets: [
        'Total Site Design: Developed the entire frontend of the Eldermine mining pool site, ensuring a user-friendly interface and seamless experience for miners of all levels.',
        'Educational Resources: Created a dedicated section for educational resources, with all articles authored and managed in MongoDB, providing miners with in-depth knowledge and guides.',
        'Support Chatbot: Implemented a support chatbot that offers instant assistance and troubleshooting for users, enhancing the overall user experience.',
        'Price Checking API: Integrated a token price checking API that provides real-time cryptocurrency prices, enabling miners to stay informed about market trends.',
        'Mining Software: Developed mining software that efficiently manages mining rigs and miners, optimizing performance and ensuring smooth operations.',
        'Supported Cryptocurrencies: The site supports a wide range of cryptocurrencies including Bitcoin, Ethereum, Dogecoin, Ravencoin, Neoxa, Aittcoin, Clore-ai, Ai-depin, Kaspa, and Firo, catering to diverse mining needs.'
    ]
  },

  crouton: {
    title: 'Crouton Jones',
    text: 'An adult animated TV show featuring over 40 unique characters, each with their own personality and charm. The show is integrated into the blockchain, offering a variety of innovative features including a custom token, an animation tool, a bespoke website, character-specific chatbots, and a task manager with DAO-like functionality. While I focused primarily on the backend development, the design was a collaborative effort with another talented designer.',
    images: [
        '/images/crouton_jones.png',
        '/images/crouton/broc_animator.jpg',
        '/images/crouton/animator-screenshot1.jpg',
    ],
    bullets: [
        'Blockchain Integration: Crouton Jones is fully integrated into the blockchain, offering features like a custom token that adds a new dimension to the show’s universe.',
        'Animation Tool: Leveraged Fae’s animation tool to create and animate the characters, bringing each of the 40+ characters to life with fluid, expressive movements.',
        'Custom Website: Developed a custom website that serves as the central hub for fans, featuring content, updates, and interactive elements tied to the show.',
        'Character Chatbots: Implemented chatbots for each of the show’s characters, allowing fans to engage in interactive conversations, with each bot reflecting the character’s unique personality.',
        'Task Manager with DAO Features: Built a task management system with DAO-like features, enabling decentralized decision-making and community-driven content creation.',
        'Collaborative Design: While the backend was my primary focus, the visual design and user experience were a collaboration with a skilled designer, resulting in a seamless and aesthetically pleasing final product.'
    ]
  },

  merlins: {
    title: 'Merlin\'s Chance',
    text: 'Merlin\'s Chance is a no-loss raffle that operates across multiple blockchains, offering participants a unique opportunity to win rewards without risking their initial investment. The platform funnels participants’ contributions into lending protocols, where the interest generated forms the prize pool. I was responsible for the complete design and development of both the backend and frontend, as well as the creation of the smart contracts that power the raffle system.',
    images: [
      '/images/merlins_chance.png',
      '/images/merlin/1.jpg',
      '/images/merlin/2.jpg',
    ],
    bullets: [
        'No-Loss Raffle: Merlin\'s Chance allows users to participate in a raffle without any risk of losing their initial investment, as funds are safely invested into lending protocols.',
        'Multi-Blockchain Support: The platform is designed to operate across multiple blockchains, providing flexibility and accessibility to users across different ecosystems.',
        'Lending Protocol Integration: Contributions from participants are pooled into lending protocols, generating interest which is then used to fund the raffle rewards.',
        'Smart Contract Development: I developed the smart contracts that manage the raffle, ensuring secure, transparent, and automated operations.',
        'Complete Site Design: I handled the full-stack development, crafting both the backend logic and the frontend user interface, delivering a seamless and intuitive user experience.',
        'Decentralized Finance (DeFi): Merlin\'s Chance is deeply integrated with DeFi principles, offering a novel way for participants to engage with decentralized finance while enjoying the thrill of a raffle.'
    ]
  },

  xenix: {
    title: 'Xenixchain',
    text: 'Xenixchain is a pioneering blockchain dedicated to revitalizing and simplifying the mining process for the general public. Built on the Kawpow algorithm, Xenixchain introduces a new era of accessible and efficient mining, with a focus on utility and gaming. My role in the project involves bringing utility to the chain through a racing game with combat features, enabling in-game transactions on the blockchain. Using the game engine provided by Fae, along with custom code, I helped create a dynamic and interactive experience that includes backend development, a chat system, an achievement system, and intelligent bots with NPCs.',
    images: [
        '/images/xnxi.png',
        '/images/xenix/1.jpg',
        '/images/xenix/2.jpg',
        '/images/xenix/3.jpg'
    ],
    bullets: [
        'Accessible Mining: Xenixchain is designed to make mining easy and accessible for everyone, leveraging the power of the Kawpow algorithm to ensure efficiency and effectiveness.',
        'Blockchain Utility: My contributions focus on bringing utility to Xenixchain by developing a racing game with combat capabilities, where players can engage in transactions directly on the blockchain.',
        'Game Development: Using Fae’s game engine, combined with custom code, I developed a racing game that features immersive gameplay, player interactions, and combat mechanics.',
        'Backend Development: I was involved in the backend development of the game, ensuring seamless integration with Xenixchain’s blockchain technology and enabling secure, real-time transactions between players.',
        'Chat System & Achievements: Implemented a chat system to enhance player communication and an achievement system to reward players for their in-game accomplishments.',
        'Bots and NPCs: Created intelligent bots and NPCs that interact with players, adding depth and challenge to the gaming experience on Xenixchain.'
    ]
},

};
// Function to show the image in fullscreen
function showFullscreenImage(event) {
  const fullscreenContainer = document.querySelector('.fullscreen-container');
const fullscreenImage = document.getElementById('fullscreen-image');
  const src = event.target.src;
  fullscreenImage.src = src;
  fullscreenContainer.classList.add('show');
}

// Function to hide the fullscreen image
function hideFullscreenImage() {
  const fullscreenContainer = document.querySelector('.fullscreen-container');

  fullscreenContainer.classList.remove('show');
}
function openPopup(projectKey) {
  const fullscreenContainer = document.querySelector('.fullscreen-container');

  const popup = document.getElementById('popup');
  const data = projectData[projectKey];

  if (data) {
    let logo = document.getElementById('popup-logo');
    document.getElementById('popup-title').textContent = data.title;
    document.getElementById('popup-text').textContent = data.text;
      const imagesContainer = document.getElementById('popup-images');
      imagesContainer.innerHTML = '';
      logo.innerHTML = '';
      let count = 0;
      data.images.forEach(image => {
          const img = document.createElement('img');
          img.src = image;
          // img.addEventListener('mouseover', showFullscreenImage);
          if(count == 0){
            logo.appendChild(img);

          }
          else{
            imagesContainer.appendChild(img);

          }
          count++;
        });
        // fullscreenContainer.addEventListener('mouseleave', hideFullscreenImage);
      const bullets = document.getElementById('popup-bullets');
      bullets.innerHTML = '';
      data.bullets.forEach(bullet => {
          const li = document.createElement('li');
          li.textContent = bullet;
          bullets.appendChild(li);
      });

      popup.classList.add('show');
  }
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.classList.remove('show');
}

// Particles
document.addEventListener("DOMContentLoaded", function() {
  const particleContainer = document.querySelector(".particle-container");
  const particleCount = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--particle-count"));

  for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = Math.random() < 0.5 ? "particle particle-gold" : "particle particle-bronze";

      // Random size between 1px and 4px
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random position along the bottom of the viewport
      const posX = Math.random() * 100;
      const posY = 100 + Math.random() * 100; // Spawn offscreen below
      particle.style.left = `${posX}vw`;
      particle.style.top = `${posY}vh`;

      // Random animation duration between 10s and 30s
      const duration = Math.random() * 20 + 10;
      particle.style.animationDuration = `${duration}s`;

      // Random animation delay to start at different times
      const delay = Math.random() * 20;
      particle.style.animationDelay = `-${delay}s`; // Negative delay to start immediately

      particleContainer.appendChild(particle);
  }
});





// Alien 

// Function to be triggered when the element is in the viewport
function onElementInView() {
  console.log("Element is in view!");
showCodeBoxes()
  // Place your function call or any other code you want to execute here
}

// Select the element you want to observe
const targetElement = document.getElementById('animation-container');

// Create an IntersectionObserver instance
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          onElementInView(); // Trigger your function
          observer.unobserve(entry.target); // Stop observing the element after it is in view
      }
  });
}, {
  threshold: 0.1 // Trigger when 10% of the element is in view
});

// Start observing the target element
observer.observe(targetElement);




const htmlCode = `
<div id="animation-container">
  <img id="ufo" src="ufo.png" alt="UFO">
  <div id="tractor-beam"></div>
  <img id="cow" src="cow.png" alt="Cow">
</div>`;

const cssCode = `
#ufo {
  z-index: 1;
  width: 150px;
  position: absolute;
  top: -25px;
  left: -150px;
  transform: translateY(0);
  opacity: 0;
  transition: left 2s ease-in-out, transform 2s ease-in-out, opacity 1s ease-in-out;
}

#cow {
  width: 60px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: bottom 2s ease-in-out, opacity 1.7s ease-in-out;
}

#tractor-beam {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 300px;
  background: radial-gradient(circle at top, rgba(255, 255, 0, 0.3) 10%, rgba(255, 255, 0, 0) 70%);
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  z-index: -1;
  clip-path: polygon(40% 0%, 60% 0%, 80% 100%, 20% 100%);
  animation: rainbow 2.5s linear infinite;
}

@keyframes rainbow {
    0% {
        filter: hue-rotate(0deg);
    }
    100% {
        filter: hue-rotate(360deg);
    }
}

`;

const jsCode = `
function abductCow() {
  const cow = document.getElementById('cow');
  cow.style.opacity = '1';
  const ufo = document.getElementById('ufo');
  const beam = document.getElementById('tractor-beam');
  const container = document.getElementById('animation-container');

  // Fade in the container
  container.style.opacity = 1;

  // UFO flies in from the left
  setTimeout(() => {
      ufo.style.opacity = 1;
      ufo.style.left = '50%';
      ufo.style.transform = 'translateX(-50%)';
  }, 100);

  // Start abduction after UFO is in position
  setTimeout(() => {
      beam.style.opacity = 1;
      cow.style.opacity = '1';
      cow.style.bottom = '100%';
      cow.style.opacity = '0';
  }, 2100);

  // UFO hovers for a bit longer
  setTimeout(() => {
      ufo.style.transform = 'translateY(-50px)';
      beam.style.opacity = 0;
      cow.style.opacity = '0';
  }, 3100);

  // UFO flies away to the left after abduction
  setTimeout(() => {
      ufo.style.left = '-150px';
      ufo.style.opacity = '0';
  }, 4100);

  // Reset the cow and UFO for the next loop
  setTimeout(() => {
      cow.style.transition = 'none';
      cow.style.bottom = '0';
      cow.style.opacity = '0';

      ufo.style.transition = 'none';
      ufo.style.left = '-150px';
      ufo.style.transform = 'translateX(-50%)';
      ufo.style.opacity = '0';

      setTimeout(() => {
          cow.style.transition = '';
          ufo.style.transition = '';
          container.style.opacity = 0;
      }, 500);

  }, 6000);
}

setInterval(abductCow, 8000);
abductCow();`;

function typeCode(element, code, callback) {
  let index = 0;
  function type() {
      if (index < code.length) {
          element.textContent += code.charAt(index);
          element.parentElement.parentElement.scrollTop = element.parentElement.parentElement.scrollHeight; // Auto-scroll as text is typed
          index++;
          setTimeout(type, 0);
      } else {
          callback && callback();
      }
  }
  type();
}

function showCodeBoxes() {
  const htmlBox = document.getElementById('html-box');
  const cssBox = document.getElementById('css-box');
  const jsBox = document.getElementById('js-box');

  htmlBox.style.opacity = 1;
  typeCode(document.getElementById('html-code'), htmlCode, () => {
      cssBox.style.opacity = 1;
      typeCode(document.getElementById('css-code'), cssCode, () => {
          cssBox.innerHTML += `<style>${cssCode}</style>`;
      });
      jsBox.style.opacity = 1;
      typeCode(document.getElementById('js-code'), jsCode, () => {
          eval(jsCode);
      });

  });
}




// Projects
const logos = document.querySelectorAll('.logo');

const projectObserver = new IntersectionObserver((entries, projectObserver) => {
  entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${index * 0.3}s`; // Delay based on index
          entry.target.style.opacity = 1;
      } else {
          entry.target.style.transitionDelay = '0s'; // Remove delay on fade out
          entry.target.style.opacity = 0;
      }
  });
}, {
  threshold: 0.5 // Adjust based on when you want the logos to start fading in
});

logos.forEach(logo => {
  projectObserver.observe(logo);
});






// Timeline

document.addEventListener("DOMContentLoaded", function() {
  const items = document.querySelectorAll(".timeline-item");

  function updateTimeline() {
      const viewportCenter = window.innerHeight / 2 + window.scrollY;

      let closestItem = null;
      let minDistance = Infinity;

      items.forEach(item => {
          const itemRect = item.getBoundingClientRect();
          const itemCenter = itemRect.top + window.scrollY + itemRect.height / 2;
          const distance = Math.abs(itemCenter - viewportCenter);

          if (distance < minDistance) {
              minDistance = distance;
              closestItem = item;
          }
      });

      items.forEach(item => {
          if (item === closestItem) {
              item.classList.add("in-view");
          } else {
              item.classList.remove("in-view");
          }
      });
  }

  window.addEventListener("scroll", updateTimeline);
  window.addEventListener("resize", updateTimeline);
  updateTimeline(); // Initial call to set up the timeline state
});


// // Contact
// document.getElementById('contact-form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     alert('Thank you for your message!');
//     // You can add further form processing logic here
//   });
  


// Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

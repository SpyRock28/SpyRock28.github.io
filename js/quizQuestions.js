let leadershipDiagram = () => {
  return [{
		"Subject": "Leadership Management Chart",
		"Topic": "Common Goals",
		"Question": "One AFSC Strategic Goal is",
		"Answers": [
			"Meet warfighter commitments.",
			"Focus on the immediate needs of the organization.",
			"Deliver quality product, regardless of cost.",
			"Improve processes for aircraft maintenance."
		],
		"CorrectAnswers": ["Meet warfighter commitments."],
		"Justifications": [
			"Always focus on the needs of our men and women on the field and in the air.",
			"Need to implement a strategic technology roadmap.",
			"Deliver more capability at less cost.",
			"Perfect our processes and accountability for the Nuclear Enterprise."
		]
  },
   {
		"Subject": "Leadership Management Chart",
		"Topic": "People",
		"Question": "Every workforce needs",
		"Answers": [
			"Education and Training.",
			"Staffing of 5 employees to a supervisor. ",
			"Enthusiastic Attitude Only",
			"Manuals and online search index for research."
		],
		"CorrectAnswers": ["Education and Training."],
		"Justifications": [
			"Either prior schooling or continual training is essential to maintaining successful workforce.",
			"Workforce needs the proper leadership to accomplish work. ",
			"Morale and workforce with the proper skillset is needed for success.",
			"Workforce needs the experience to accomplish work and assist coworkers."
		]
  },
  {
		"Subject": "Leadership Management Chart",
		"Topic": "Speed, Safety, Quality",
		"Question": "Safety is enhanced by",
		"Answers": [
			"Hoping workforce has common sense to handle whatever safety problems may arise.",
			"Providing safety brochure in employee onboarding packet.",
			"Make sure workforce has sufficient work to keep them busy.",
			"Following regulatory guidance."
		],
		"CorrectAnswers": ["Following regulatory guidance."],
		"Justifications": [
			"Create a methodical/predictable flow.",
			"Constant and engaging encouragement is needed to maintain safe environment.",
			"Create a methodical/predictable flow.",
			"Maintain compliance with agencies, such as OSHA. "
		]
	}, 
	{
		"Subject": "Leadership Management Chart",
		"Topic": "Cost Effective Readiness",
		"Question": "What is required to reduce the cost to sustain weapon systems?",
		"Answers": [
			"Budget with an extra 10%, to cover unexpected costs.",
			"Understand where money is spent.",
			"Deliver highest quality of product.",
			"Provide all possible resources to accomplish work."
		],
		"CorrectAnswers": ["Understand where money is spent."],
		"Justifications": [
			"Reduce cost of mission execution.",
			"Knowing where all money is used, is necessary to understand where reduction of costs can be adjusted.",
			"Provide affordable product that meets customer requirements.",
			"Reduce waste by providing only what is needed to accomplish work."
		]
  }];
}


let littlesLaw = () => {
	return [{
		"Subject": "Little's Law",
		"Topic": "Takt Time",
		"Question": "Takt Time is the reciprocal of Throughput?  True or False",
		"Answers": [
			"True",
			"False"
			],
		"CorrectAnswers": ["True"],
		"Justifications": [
			"Takt Time is the time divided by unit, which is the reciprocal of Throughput.",
			"Takt Time is the reciprocal of Throughput"
			]
  },
   {
		"Subject": "Little's Law",
		"Topic": "Takt Time",
		"Question": "Little's Law and Takt time are flow management tools designed to manage WIP?  True or False",
		"Answers": [
			"True",
			"False"
			],
		"CorrectAnswers": ["True"],
		"Justifications": [
			"Creates a steady state in which work is released into the process machine.",
			"Both flow management and Takt time can be used to manage WIP."
			]
  },
  {
		"Subject": "Little's Law",
		"Topic": "Flowtime",
		"Question": "What is the Calculation for Flowtime?",
		"Answers": [
			"WIP / Takt Time",
			"WIP * Takt Time",
			"Takt Time / WIP "
		],
		"CorrectAnswers": ["WIP * Takt Time"],
		"Justifications": [
			"WIP = Throughput * Flowtime; divide each side of equation by Throughput to solve for Flowtime",
			"Flowtime is the amount of WIP multiplied by the rate of items entering the machine.",
			"WIP = Throughput * Flowtime; divide each side of equation by Throughput to solve for Flowtime"
		]
  }, 
  {
		"Subject": "Little's Law",
		"Topic": "Throughput",
		"Question": "Why is Little's Law Important?",
		"Answers": [
			"Reduces Cost?",
			"Reduces manpower?",
			"Improves speed and reduces WIP."
		],
		"CorrectAnswers": ["Improves speed and reduces WIP."],
		"Justifications": [
			"Not a mechanism for calculating cost?",
			"Not a mechanism for calculating labor.",
			"Understanding and utilizing Little's Law will facilitate the improving speed and reducing WIP."
		]
  }];
}  

let radiatorChart = () => {
  return [{
		"Subject": "Radiator Chart",
		"Topic": "Execution Elements",
		"Question": "Which item is not a part of the Blue Horizontal Bar Execution Elements?",
		"Answers": [
			"Eight elements for 'set-up' to 'execution'.",
			"Little’s Law Calculation",
			"Focused on the process machine",
			"In order from strategic to tactical."
		],
		"CorrectAnswers": ["Little’s Law Calculation"],
		"Justifications": [
			"Elements include 'Road To', 'Networks','Gates','Release Points','Visual Displays','Standard Work & Scripting','Tools & Regulatory Guidance','Touch Time' ",
			"Calculation is not a component of Execution Elements.",
			"Execution of incremental steps focused on completing the outcome of the process machine.",
			"Begin at planning and continue to the point of action."
		]
  },
   {
		"Subject": "Radiator Chart",
		"Topic": "Gates",
		"Question": "Gates in the radiator charts refers to...",
		"Answers": [
			"Delivery outcome of process machine.",
			"Continual process flow.",
			"Focused on critical path urgency.",
			"Semi-regular monitoring."
		],
		"CorrectAnswers": ["Focused on critical path urgency."],
		"Justifications": [
			"Refers to discrete increments of work along the critical path.",
			"Contains tangible ending points.",
			"Utilized concepts of critical path for efficient flow.",
			"Requires active and disciplined monitoring."
		]
  },
  {
		"Subject": "Radiator Chart",
		"Topic": "Bottom Four",
		"Question": "What question does the Bottom Four Elements NOT answer:",
		"Answers": [
			"Do actions need to taken?",
			"Are all systems go?",
			"Do adjustments need to be made?",
			"Who is responsible for sign of on each gate?"
		],
		"CorrectAnswers": ["Who is responsible for sign of on each gate?"],
		"Justifications": [
			"Highlights if further efforts need to be put in place to complete process machine.",
			"Provides active assessment of each element of machine to make sure it is ready for completion.",
			"Helps identify gaps or missed steps that need to be incorporated into process machine.",
			"Not a defined function of the Bottom Four Elements."
		]
  },
  {
		"Subject": "Radiator Chart",
		"Topic": "Leadership Pillars",
		"Question": "Which item is true for what the Leadership Pillars provide?",
		"Answers": [
			"Requires passing familiarity with process machine.",
			"Contains five elements to manage gates.",
			"Creates the environment for success.",
			"Incorporate Quality, without incorporating Speed and Safety."
		],
		"CorrectAnswers": ["Creates the environment for success."],
		"Justifications": [
			"Requires full understanding of the process machine.",
			"Contains Seven elements to manage process machine.",
			"Completion of steps will help provide necessary components for successful completion of process machine.",
			"Also incorporates Speed and Safety. "
		]
  }];
}
let criticalPath = () => {
  return [{
		"Subject": "Critical Path",
		"Topic": "Critical Path",
		"Question": "What is critical path?",
		"Answers": [
			"A set list of critical activities that lead to deliverable management",
			"The path on the project where the project manager realizes he needs more management oversight.",
			"The set of activities, if not completed on time will extend the end date of the project.",
			"Extra float in the project that allows the end date to remain the same."
		],
		"CorrectAnswers": ["A set list of critical activities that lead to deliverable management"],
		"Justifications": [
			"Goal of critical path is to define efficient path to deliverable.",
			"Management oversight is not a requirement of critical path planning.",
			"While efficiency is important, focus on end date completion is not a driver for critical path planning.",
			"Buffering the amount of float is not a component of critical path planning."
		]
  },
  {
		"Subject": "Critical Path",
		"Topic": "Critical Path",
		"Question": "What is fast tracking?",
		"Answers": [
			"A high speed train.",
			"A way to decrease critical path by performing activities in series.",
			"A way to decrease critical path by performing activities in parallel.",
			"A way to increase critical path."
		],
		"CorrectAnswers": ["A way to decrease critical path by performing activities in parallel."],
		"Justifications": [
			"Train systems may use critical path for delivery optimization, but is not the fast tracking used in critical path planning.",
			"Planning activities in series is not the best approach for reducing time.",
			"Organizing activities, which can work independently from each other, allows for increasing time of delivery.",
			"Should not increase, but rather descrease."
		]
  },
  {
		"Subject": "Critical Path",
		"Topic": "Critical Path",
		"Question": "You and the team have identified the critical path and are now reviewing the available float in your project network diagram. All of the following statements about float are incorrect except for which one?",
		"Answers": [
			"Every project will have float.",
			"Only complex projects will have float.",
			"Float is the amount of time an activity can be delayed without increasing the project costs.",
			"Float is the amount of time an activity can be delayed without causing the project to be late."
		],
		"CorrectAnswers": ["Float is the amount of time an activity can be delayed without causing the project to be late."],
		"Justifications": [
			"Every project is not guaranteed to need float.",
			"Float can apply to any type of projects.",
			"Float does not increase project costs.",
			"Focus needs to be placed on not impacting delivery time, when establishing float."
		]
  },
  {
		"Subject": "Critical Path",
		"Topic": "Critical Path",
		"Question": "You are the project manager for your organization and are creating the project schedule. You know that a project schedule is composed of all the following components except for which one?",
		"Answers": [
			"The network of all the tasks within the project.",
			"The assignment of resources.",
			"The budget for the project.",
			"The reflection of the WBS."
		],
		"CorrectAnswers": ["The budget for the project."],
		"Justifications": [
			"Understanding of network is not necessary.",
			"Understanding assignment of resources is not necessary.",
			"Budget is necessary to know costs.",
			"Understanding WBS is not necessary."
		]
  }];
}

let questionFunctionNames = [leadershipDiagram, littlesLaw, radiatorChart, criticalPath];

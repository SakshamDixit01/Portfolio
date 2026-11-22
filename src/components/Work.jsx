import { useMemo, useState } from 'react';
import ProjectModal from './ProjectModal';
import MaskedTitle from './MaskedTitle';

import quizMain from '../assets/codequiz-1.webp';
import quizFeedback from '../assets/codequiz-2.webp';

import expenseMain from '../assets/expense-tracker.webp';
import expenseHistory from '../assets/expense-history.webp';
import expenseGroups from '../assets/expense-groups.webp';
import expenseSettlement from '../assets/expense-settlements.webp';

import carDataset from '../assets/car-price-1.webp';
import carWorkflow from '../assets/car-price-2.webp';
import carStudy from '../assets/car-price-3.webp';

import numpyMain from '../assets/numpy.webp';

export default function Work() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  const projects = useMemo(
    () => [
      {
        bgClass: 'bg-1',
        cardImage: quizMain,
        shortTitle: 'Code Quiz',
        category: 'LEARNING PLATFORM • FLASK • WEB',
        tagline: 'A demo quiz platform for practising programming concepts',
        description:
          'Code Quiz is a learning-platform demo built around multiple-choice questions that help students practise programming languages. The public repository includes a Flask application, templates, static files, and a SQLite database. The project is still being developed.',
        problem:
          'Students often need a simple, repeatable way to check their understanding of programming topics while learning a language.',
        solution:
          'The project presents programming practice as multiple-choice questions and provides a web-based demo structure using Flask and a browser frontend.',
        techStack: ['Python', 'Flask', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
        features: [
          'Multiple-choice programming questions',
          'Student-focused learning concept',
          'Flask application structure',
          'Templates and static frontend files'
        ],
        architectureFlow: [
          { step: '01', title: 'Student', tech: 'Browser', desc: 'Opens the quiz learning interface' },
          { step: '02', title: 'Quiz UI', tech: 'HTML • CSS • JavaScript', desc: 'Presents multiple-choice questions and choices' },
          { step: '03', title: 'Application', tech: 'Python • Flask', desc: 'Handles the web application routes' },
          { step: '04', title: 'Data Store', tech: 'SQLite', desc: 'Project repository includes a local database file' }
        ],
        architectureDetails: [
          { title: 'Learning Through MCQs', desc: 'The repository describes a quiz experience intended to help students learn programming languages through multiple-choice questions.' },
          { title: 'Simple Web Structure', desc: 'The project is organised with a Flask application, templates, static assets, and a SQLite database.' },
          { title: 'Work in Progress', desc: 'The repository currently identifies itself as a demo that is still being worked on.' }
        ],
        metrics: [
          { label: 'PROJECT STATUS', value: 'Demo / In Progress' },
          { label: 'BACKEND', value: 'Flask' },
          { label: 'DATABASE', value: 'SQLite' },
          { label: 'FORMAT', value: 'Web Application' }
        ],
        title: 'Code Quiz',
        images: [quizMain, quizFeedback],
        githubUrl: 'https://github.com/SakshamDixit01/Code-Quiz-'
      },
      {
        bgClass: 'bg-2',
        cardImage: expenseMain,
        shortTitle: 'Smart Expense Tracker',
        category: 'PYTHON • CLI • EXPENSE MANAGEMENT',
        tagline: 'A terminal-based expense tracker for students and shared rooms',
        description:
          'Smart Expense Tracker is designed for students living in hostels or shared rooms who need to keep track of expenses. The current public repository is a terminal-based Python project with separate local JSON records for expenses, groups, and settlements. A web or app version is described as a future upgrade, not a current live feature.',
        problem:
          'Students sharing a room or hostel may need a straightforward way to record common expenses and keep track of shared costs.',
        solution:
          'The current project provides a Python terminal workflow and local data files for expense, group, and settlement records.',
        techStack: ['Python', 'JSON', 'Command Line', 'Local File Storage'],
        features: [
          'Terminal-based expense tracking',
          'Expense records stored locally',
          'Separate group and settlement data files',
          'Designed around student and room-sharing use cases'
        ],
        architectureFlow: [
          { step: '01', title: 'User Input', tech: 'Python CLI', desc: 'Enters an expense from the terminal' },
          { step: '02', title: 'Expense Data', tech: 'expenses.json', desc: 'Stores expense records locally' },
          { step: '03', title: 'Group Data', tech: 'groups.json', desc: 'Keeps group-related records' },
          { step: '04', title: 'Settlements', tech: 'settlements.json', desc: 'Stores settlement records for shared expenses' }
        ],
        architectureDetails: [
          { title: 'Terminal-First Version', desc: 'The current public project is a command-line / terminal program rather than a deployed website.' },
          { title: 'Local JSON Records', desc: 'The repository includes JSON files for expenses, groups, and settlements, alongside Python storage and application modules.' },
          { title: 'Student-Oriented Use Case', desc: 'The project description focuses on students living in hostels and shared rooms.' }
        ],
        metrics: [
          { label: 'PROJECT STATUS', value: 'CLI Version' },
          { label: 'LANGUAGE', value: 'Python' },
          { label: 'DATA FORMAT', value: 'JSON' },
          { label: 'TARGET USERS', value: 'Students / Roommates' }
        ],
        title: 'Smart Expense Tracker',
        images: [expenseMain, expenseHistory, expenseGroups, expenseSettlement],
        githubUrl: 'https://github.com/SakshamDixit01/Smart-Expense-Tracker'
      },
      {
        bgClass: 'bg-3',
        cardImage: carDataset,
        shortTitle: 'Car Price Prediction',
        category: 'MACHINE LEARNING • JUPYTER NOTEBOOK',
        tagline: 'A notebook-based exploration of used-car price prediction',
        description:
          'Car Price Prediction is a public notebook repository presented for use in Google Colab. Its description identifies the task as working with car-price data and exploring used-car price prediction. The portfolio does not claim a deployed prediction service or publish unverified accuracy figures.',
        problem:
          'Estimating a used car’s price is the central prediction task explored by this notebook project.',
        solution:
          'The repository shares a Jupyter notebook for exploring the car-price prediction task and its data in a notebook environment.',
        techStack: ['Python', 'Jupyter Notebook', 'Google Colab', 'Machine Learning'],
        features: [
          'Notebook-based project workflow',
          'Used-car price prediction topic',
          'Car-price data exploration',
          'Public GitHub repository'
        ],
        architectureFlow: [
          { step: '01', title: 'Notebook', tech: 'Google Colab', desc: 'Opens the shared notebook environment' },
          { step: '02', title: 'Data', tech: 'Car Price Dataset', desc: 'Works with the car-price data used in the notebook' },
          { step: '03', title: 'Exploration', tech: 'Python', desc: 'Explores the prediction task in notebook cells' },
          { step: '04', title: 'Study', tech: 'Price Prediction', desc: 'Examines the used-car price prediction problem' }
        ],
        architectureDetails: [
          { title: 'Notebook Format', desc: 'The public repository contains a Jupyter notebook rather than a deployed application.' },
          { title: 'Colab-Friendly Workflow', desc: 'The repository description states that the notebook is presented in Google Colab.' },
          { title: 'No Unverified Metrics', desc: 'No prediction accuracy or model benchmark is displayed here unless it is documented and verified in the repository.' }
        ],
        metrics: [
          { label: 'PROJECT TYPE', value: 'ML Notebook' },
          { label: 'LANGUAGE', value: 'Python' },
          { label: 'FORMAT', value: 'Jupyter' },
          { label: 'PLATFORM', value: 'Google Colab' }
        ],
        title: 'Car Price Prediction',
        images: [carDataset, carWorkflow, carStudy],
        githubUrl: 'https://github.com/SakshamDixit01/Car-Price-Prediction'
      },
      {
        bgClass: 'bg-1',
        cardImage: numpyMain,
        shortTitle: 'NumPy Practice',
        category: 'PYTHON • NUMERICAL COMPUTING • NOTEBOOK',
        tagline: 'An introductory NumPy practice repository',
        description:
          'The NumPy repository is a small learning notebook described as a first NumPy program. It is included as an example of ongoing Python practice, rather than being presented as a large standalone application.',
        problem:
          'Building confidence with Python libraries is an important part of learning programming and data-focused concepts.',
        solution:
          'This repository keeps an introductory NumPy notebook available for reference and continued practice.',
        techStack: ['Python', 'NumPy', 'Jupyter Notebook'],
        features: [
          'Introductory NumPy notebook',
          'Python library practice',
          'Public learning repository'
        ],
        architectureFlow: [
          { step: '01', title: 'Python', tech: 'Notebook Runtime', desc: 'Starts the practice notebook' },
          { step: '02', title: 'NumPy', tech: 'Python Library', desc: 'Uses NumPy in the notebook' },
          { step: '03', title: 'Practice', tech: 'Code Cells', desc: 'Runs introductory examples' },
          { step: '04', title: 'Learning', tech: 'Jupyter', desc: 'Keeps the exercises together in one notebook' }
        ],
        architectureDetails: [
          { title: 'Foundational Practice', desc: 'The repository is intentionally represented as an introductory learning exercise.' },
          { title: 'Single Notebook', desc: 'The public repository contains the numpy.ipynb notebook.' },
          { title: 'Growing Foundations', desc: 'This repository reflects early exploration of Python tools and numerical computing.' }
        ],
        metrics: [
          { label: 'REPOSITORY TYPE', value: 'Learning Repo' },
          { label: 'FILE', value: 'numpy.ipynb' },
          { label: 'LIBRARY', value: 'NumPy' },
          { label: 'STATUS', value: 'Foundational Practice' }
        ],
        title: 'NumPy Practice',
        images: [numpyMain],
        githubUrl: 'https://github.com/SakshamDixit01/NumPy'
      }
    ],
    []
  );

  const activeProject = activeProjectIndex === null ? null : projects[activeProjectIndex];

  return (
    <section id="work" className="container work-page-section">
      <div className="gsap-reveal work-header">
        <MaskedTitle number="2." text="Featured Work" />
        <div className="divider" />
      </div>

      <div className="work-grid">
        {projects.map((proj, index) => (
          <div
            key={proj.title}
            className="project-card hoverable gsap-work-card"
            role="button"
            tabIndex={0}
            onClick={() => setActiveProjectIndex(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setActiveProjectIndex(index);
            }}
            aria-label={`Open project: ${proj.title}`}
          >
            <div
              className={`project-bg ${proj.bgClass}`}
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.30)), url(${proj.cardImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div className="project-overlay" />
            <div className="project-info">
              <p className="font-mono project-category text-gray uppercase">{proj.category}</p>
              <h3 className="project-title text-glow uppercase">{proj.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        open={activeProjectIndex !== null}
        onClose={() => setActiveProjectIndex(null)}
        project={activeProject}
      />
    </section>
  );
}

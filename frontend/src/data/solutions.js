// Only list tools in "tools" that we have really used. Empty array hides the tools row.
export const solutions = [
  {
    "id": "performance-testing",
    "title": "Performance Testing & Engineering",
    "challenge": "Applications slow down or fail under real user load, and teams find out after release.",
    "example": "Plan and run load, stress and endurance tests before a major release.",
    "tools": [
      "LoadRunner",
      "JMeter",
      "NeoLoad",
      "Gatling",
      "k6"
    ],
    "help": [
      "Define workload models and test scenarios",
      "Run load tests and analyse bottlenecks",
      "Report findings with clear recommendations"
    ],
    "engagementType": "testing"
  },
  {
    "id": "test-automation",
    "title": "Test Automation",
    "challenge": "Manual regression testing slows down releases.",
    "example": "Build a regression automation suite for a web application.",
    "tools": [
      "Playwright",
      "Selenium",
      "Karate",
      "Postman",
      "REST Assured"
    ],
    "help": [
      "Automate suitable manual regression tests",
      "Organise repeatable test runs",
      "Report results clearly before release"
    ],
    "engagementType": "testing"
  },
  {
    "id": "test-pipelines",
    "title": "Test Pipelines & CI/CD",
    "challenge": "Tests run by hand, so results arrive late and inconsistently.",
    "example": "Run automated tests on every build or nightly in a CI pipeline.",
    "tools": [
      "Jenkins",
      "GitHub",
      "Maven"
    ],
    "help": [
      "Connect automated tests to the build process",
      "Schedule regular test runs",
      "Make results easy to review"
    ],
    "engagementType": "testing"
  },
  {
    "id": "team-extension",
    "title": "Team Extension & Specialist Hiring",
    "challenge": "You need skilled people quickly, and hiring in-house takes too long.",
    "example": "Add a tester, developer or analyst to an existing project team on contract.",
    "tools": [],
    "help": [
      "Clarify the role and skills needed",
      "Shortlist screened candidates",
      "Check in after joining"
    ],
    "engagementType": "hiring"
  }
];

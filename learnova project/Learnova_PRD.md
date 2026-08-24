# Learnova — Product Requirements Document (PRD)

> **Tagline:** Don't just learn what you got wrong. Understand why.

---

## 1. Product Overview

**Product Name:** Learnova AI  
**Category:** EdTech / AI-powered adaptive learning  
**Target Users:** Students, self-learners, teachers, and mentors

Learnova AI is an intelligent learning platform that identifies the **root cause behind a student's mistakes**, maps those weaknesses to prerequisite concepts, provides targeted remediation, and verifies whether the student has actually improved.

### Core Learning Cycle

**Learn → Test → Diagnose → Repair → Retest → Master → Review**

The goal is to move beyond conventional learning platforms that primarily track scores and topics and instead track the student's **actual conceptual understanding and misconceptions**.

---

# 2. Problem Statement

Most learning platforms answer:

> "What did the student get wrong?"

Learnova aims to answer:

> **"Why did the student get it wrong?"**

### Example

A student fails a recursion question.

A traditional platform might say:

```text
Recursion: 40%
Practice more recursion.
```

Learnova instead analyzes prerequisite concepts:

```text
Recursion
    ↓
Function Calls        84% ✅
    ↓
Call Stack            29% ❌
    ↓
Stack Frames          21% ❌
```

The system identifies that the student's problem may not be recursion itself, but a **prerequisite misconception about stack frames**.

It then repairs that specific gap and retests the student.

---

# 3. Product Vision

Create a **personal learning system** that continuously understands how a student learns and adapts the learning journey around their actual conceptual understanding.

### Vision Statement

> Every student should have a learning path based on what they understand—not simply what chapter they are currently studying.

---

# 4. Target Users

## 4.1 Primary Users — Students

- School students
- College students
- Engineering students
- CSE students
- Competitive programming learners
- Self-learners
- Online-course learners

### Initial Hackathon Target

**College CSE students learning Programming and DSA.**

This keeps the MVP focused and technically manageable.

## 4.2 Secondary Users — Teachers/Mentors

Teachers can:

- Monitor class mastery
- Identify common misconceptions
- Find struggling students
- View concept-level performance
- Recommend interventions
- Track student improvement

---

# 5. Product Goals

### Primary Goals

1. Detect conceptual weaknesses.
2. Identify prerequisite/root concepts behind mistakes.
3. Build a personalized knowledge graph.
4. Generate targeted remediation.
5. Verify improvement through retesting.
6. Track long-term mastery.
7. Schedule revision based on retention.

### Main Success Criterion

A student should be able to move from:

> "I don't understand why I keep getting this wrong."

to:

> **"I know exactly what concept I was missing, I fixed it, and I can now solve it."**

---

# 6. Core Product Concept — The Learnova

```text
             ┌─────────────┐
             │    LEARN    │
             └──────┬──────┘
                    ↓
             ┌─────────────┐
             │    TEST     │
             └──────┬──────┘
                    ↓
             ┌─────────────┐
             │  DIAGNOSE   │
             └──────┬──────┘
                    ↓
             ┌─────────────┐
             │    REPAIR   │
             └──────┬──────┘
                    ↓
             ┌─────────────┐
             │   RETEST    │
             └──────┬──────┘
                    ↓
             ┌─────────────┐
             │   MASTER    │
             └──────┬──────┘
                    ↓
             ┌─────────────┐
             │    REVIEW   │
             └──────┬──────┘
                    │
                    └──────────→ LOOP
```

This loop is the fundamental product mechanic.

---

# 7. Key Differentiator

## Learning Debugger

Instead of simply providing the correct answer, Learnova analyzes the student's mistake and attempts to locate the underlying conceptual gap.

### Example

Student:

```text
❌ Wrong recursion answer
```

Learnova:

```text
Root gap detected:
Call Stack

Mastery: 31%
```

Then:

> Your understanding of function calls is strong, but your answers indicate difficulty visualizing how function calls are stored and returned from the call stack.

Recommended:

```text
4-minute Call Stack module
+
3 diagnostic questions
```

---

# 8. Student Onboarding

The student selects:

- Subject
- Course
- Current level
- Learning goal
- Available study time

### Example

```text
Goal:
☑ Learn DSA

Current Level:
○ Beginner
● Intermediate
○ Advanced

Daily Study Time:
30 minutes
```

---

# 9. Diagnostic Assessment

Before creating a learning path, Learnova performs a short diagnostic assessment.

### Purpose

Determine:

- Existing knowledge
- Strong concepts
- Weak concepts
- Missing prerequisites
- Potential misconceptions

### Example Result

```text
Arrays             92%
Functions          81%
Pointers           47%
Recursion          38%
Call Stack         29%
```

This establishes the initial learner model.

---

# 10. Knowledge Graph

Every course is represented as interconnected concepts.

### Example

```text
                    DSA
                     │
          ┌──────────┼──────────┐
          ↓          ↓          ↓
        Arrays     Trees      Graphs
          │          │
          ↓          ↓
      Searching    Recursion
                     │
                     ↓
                 Call Stack
```

Each concept stores:

- Mastery score
- Prerequisites
- Learning status
- Mistakes
- Attempts
- Retention
- Recommended resources

---

# 11. Dynamic Student Knowledge Graph

The student's graph changes over time.

### Initial State

```text
Recursion 🔴
Call Stack 🔴
Functions 🟢
```

### After Repair

```text
Recursion 🟡
Call Stack 🟢
Functions 🟢
```

### After Successful Retesting

```text
Recursion 🟢
Call Stack 🟢
Functions 🟢
```

The graph becomes a visual representation of the student's current knowledge.

---

# 12. Adaptive Testing

Questions are selected based on:

- Current mastery
- Previous mistakes
- Question difficulty
- Prerequisite relationships
- Recent performance

### Example

If a student struggles with Binary Search, Learnova may test:

1. Array indexing
2. Sorted arrays
3. Search space
4. Mid calculation
5. Binary Search

This helps determine where the conceptual breakdown begins.

---

# 13. Misconception Detection

The system maintains a misconception record.

### Example

```text
Concept:
Pointers

Detected Misconception:
"Pointer stores the value rather than
the memory address."

Confidence:
87%

Evidence:
4 incorrect answers
```

The student isn't simply labeled as "weak."

The system attempts to understand **why** they are weak.

---

# 14. "Why Am I Wrong?" Feature

Every incorrect answer provides a:

## 🔍 Find Why

The system explains:

1. What the student did.
2. Where the reasoning diverged.
3. Which concept caused the issue.
4. What prerequisite is missing.
5. What the student should learn next.

### Example

```text
Your Answer
     ↓
Incorrect
     ↓
Reasoning Analysis
     ↓
Root Cause Found
     ↓
Call Stack
     ↓
Targeted Repair
```

---

# 15. Diagnostic Questions

After identifying a possible misconception, Learnova generates a small diagnostic set.

### Example — Call Stack

**Q1:** What happens when a function calls another function?

**Q2:** Which function returns first?

**Q3:** What happens to a stack frame after a function returns?

The purpose of these questions is **diagnosis**, not examination.

---

# 16. Repair Session

Once the root problem is identified, Learnova creates a short targeted learning session.

### Structure

```text
Concept Explanation
        ↓
Visual Example
        ↓
Micro Question
        ↓
Practice
        ↓
Mini Test
```

### Target Duration

**2–10 minutes**

The student should not have to repeat an entire chapter to fix one misconception.

---

# 17. Retesting

After repair, the student receives new questions.

The system compares performance.

### Example

```text
Before Repair:

Call Stack → 29%

After Repair:

Call Stack → 78%
```

If improvement isn't sufficient:

> The concept isn't mastered yet.

Learnova provides another remediation path.

---

# 18. Mastery System

Each concept receives a dynamic mastery score.

Possible factors:

- Accuracy
- Question difficulty
- Consistency
- Recent performance
- Retention
- Number of misconceptions
- Time between attempts

### Example

```text
CALL STACK

Mastery: 78%

Accuracy       84%
Consistency    76%
Retention      71%
Difficulty     81%
```

---

# 19. Spaced Review

Learnova tracks concepts that may be forgotten.

### Example

```text
Day 0
Learn
   ↓
Day 2
Quick Review
   ↓
Day 7
Retention Test
   ↓
Day 21
Mastery Check
```

If performance decreases, the system increases review frequency.

---

# 20. Personalized Learning Path

Instead of forcing every student through the same curriculum:

### Traditional

```text
Chapter 1
   ↓
Chapter 2
   ↓
Chapter 3
   ↓
Chapter 4
```

### Learnova

```text
Student A:

Arrays
   ↓
Pointers
   ↓
Memory
   ↓
Linked Lists
```

```text
Student B:

Arrays
   ↓
Functions
   ↓
Recursion
   ↓
Trees
```

The learning path changes based on individual knowledge gaps.

---

# 21. Student Dashboard

The dashboard should display:

### Overview

- Overall mastery
- Current streak
- Learning time
- Concepts mastered
- Concepts needing attention

### Today's Plan

```text
Today's Learning

✓ Review Functions
○ Repair Call Stack
○ 5 Recursion Questions
○ Retention Test
```

### Priority Concepts

```text
🔴 Call Stack       29%
🟠 Recursion        44%
🟡 Graphs           61%
🟢 Arrays           92%
```

---

# 22. Knowledge Galaxy UI

The Knowledge Galaxy is the major visual component.

Each concept is represented as a node.

### Node States

```text
🟢 Mastered
🟡 Developing
🟠 Weak
🔴 Critical
⚪ Not Learned
```

Clicking a node opens its details.

### Example

```text
CALL STACK

Mastery
31%

Prerequisites
✓ Functions
⚠ Stack Frames

Detected Issues
• Return order
• Stack frame creation

Recommended
4-minute repair
```

---

# 23. Learning DNA

Each student receives a personalized learning profile.

### Example

```text
YOUR LEARNING DNA

Strongest:
Logical Reasoning

Strong Concepts:
Arrays
Functions

Current Challenge:
Graphs

Most Common Mistake:
Off-by-one errors

Preferred Learning Mode:
Visual + Practice
```

---

# 24. Teacher Dashboard

Teachers can view:

### Class Mastery

```text
Arrays          87% 🟢
Functions       79% 🟢
Recursion       48% 🔴
Pointers        42% 🔴
```

### Common Misconceptions

```text
Pointers
28 students

Recursion
19 students

Memory
12 students
```

Teachers can select:

> **Intervene**

and assign a remediation module.

---

# 25. Teacher Analytics

Teacher analytics include:

- Student progress
- Concept mastery
- Common misconceptions
- Students requiring intervention
- Improvement over time
- Question difficulty
- Class knowledge map

---

# 26. AI Components

AI should support the learning engine rather than become the entire product.

### AI Responsibilities

- Explain concepts
- Analyze answers
- Generate questions
- Identify likely misconceptions
- Generate remediation
- Provide personalized feedback

### Non-AI Components

- Knowledge graph
- Mastery calculation
- User management
- Progress tracking
- Review scheduling
- Analytics
- Course structure

This makes the architecture more reliable and explainable.

---

# 27. System Architecture

```text
                    FRONTEND
                       │
             React / Next.js
                       │
                       ↓
                 API Layer
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
  Learning Engine   AI Engine    Analytics
        │              │              │
        ↓              ↓              ↓
  Knowledge Graph   LLM API       PostgreSQL
        │
        ↓
 Student Model
        │
        ↓
 Personalized Learning Path
```

---

# 28. Recommended Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Flow

## Backend

- Node.js
- Next.js API Routes / Express

## Database

- PostgreSQL

## Authentication

- Clerk
- Auth.js
- Firebase Authentication

## AI

- OpenAI API
- Gemini API
- Other LLM API

## Visualization

- React Flow
- Recharts

## Deployment

- Vercel
- Supabase / Neon

---

# 29. MVP Scope — 24 Hour Hackathon

Do **not** attempt to build every feature.

Focus on the core loop:

```text
Login
  ↓
Choose DSA
  ↓
Diagnostic Test
  ↓
Knowledge Graph
  ↓
Take Quiz
  ↓
Wrong Answer
  ↓
"Why Am I Wrong?"
  ↓
Root Cause
  ↓
3-Question Diagnostic
  ↓
Repair Lesson
  ↓
Retest
  ↓
Knowledge Graph Updates
```

This is enough for a strong hackathon demonstration.

---

# 30. MVP Screens

Build approximately **7 highly polished screens**.

### 1. Landing Page

- Hero
- Product explanation
- Animated knowledge graph
- CTA

### 2. Student Dashboard

- Mastery
- Today's tasks
- Weak concepts
- Progress

### 3. Diagnostic Test

- Initial assessment
- Progress indicator
- Results

### 4. Knowledge Galaxy

- Interactive concept graph
- Concept states
- Prerequisites

### 5. Quiz

- Questions
- Answers
- Difficulty
- Submit

### 6. Learning Debugger

- Incorrect answer
- AI reasoning analysis
- Root cause
- Misconception

### 7. Repair + Progress

- Micro lesson
- Diagnostic questions
- Retest
- Before/after mastery

---

# 31. Example End-to-End Demo

### Step 1

Student chooses:

```text
DSA → Recursion
```

### Step 2

Initial assessment:

```text
Arrays       90%
Functions    82%
Pointers     55%
Recursion    42%
```

### Step 3

Student attempts recursion.

```text
❌ Wrong
```

### Step 4

Learnova analyzes the error.

```text
Recursion       42%
     ↓
Functions       82% ✓
     ↓
Call Stack      31% ✗
```

### Step 5

System identifies:

```text
Likely Root Gap:
Call Stack
```

### Step 6

Student completes a 4-minute repair.

### Step 7

Retest:

```text
Call Stack
31% → 79%

Recursion
42% → 83%
```

### Step 8

Knowledge graph updates in real time.

This is the main **Learnova demo moment**.

---

# 32. UI/UX Direction

## Recommended Theme

### Premium Learning OS

Use:

- Soft white/light-gray background
- Glassmorphism
- Subtle claymorphism
- Indigo/violet primary color
- Pastel concept nodes
- Large rounded cards
- Soft shadows
- Smooth animations
- Minimal typography

### Alternative

A dark "Learning Intelligence Lab" theme can be used if a more futuristic aesthetic is desired.

---

# 33. Signature UI Elements

The interface should have three memorable elements:

### 1. Knowledge Galaxy

Interactive concept graph showing the student's knowledge.

### 2. Why Am I Wrong?

A learning debugger that identifies the reason behind an incorrect answer.

### 3. Learnova Animation

```text
LEARN
  ↓
TEST
  ↓
DIAGNOSE
  ↓
REPAIR
  ↓
VERIFY
  ↓
MASTER
```

These should be more prominent than ordinary dashboard widgets.

---

# 34. Success Metrics

## Learning Effectiveness

- Pre-test vs post-test improvement
- Percentage of gaps successfully repaired
- Retest improvement
- Concept retention

## Engagement

- Daily active users
- Learning sessions completed
- Diagnostic tests completed
- Repair sessions completed
- Average session duration

## Core Product Metrics

### Root-Cause Accuracy

Percentage of diagnosed root causes subsequently supported by diagnostic-question results.

### Repair Effectiveness

Percentage of students who improve after targeted remediation.

### Mastery Retention

Percentage of concepts still mastered after a later retention test.

---

# 35. Future Roadmap

## V2

- PDF/course ingestion
- YouTube/course integration
- More subjects
- Teacher-created courses
- Mobile application
- Voice learning
- Multi-language support

## V3

- Code execution analysis
- IDE integration
- LeetCode integration
- GitHub learning analytics
- Collaborative learning

## V4

- University deployment
- LMS integrations
- Institutional analytics
- Enterprise dashboards

---

# 36. Competitive Positioning

Do not claim:

> "We are the first personalized learning platform."

Instead position Learnova as:

### Traditional Learning

```text
Performance
     ↓
Recommendation
```

### Learnova

```text
Mistake
   ↓
Reason
   ↓
Root Concept
   ↓
Repair
   ↓
Verification
```

### Core Positioning

> **Learnova is a learning debugger, not just an AI tutor.**

---

# 37. Hackathon Pitch

## Problem

Students know **what answer is wrong**, but often don't know **why their thinking is wrong**.

## Solution

Learnova builds a dynamic model of a student's knowledge and diagnoses the prerequisite concepts behind their mistakes.

## Innovation

Instead of sending students through entire chapters again, Learnova identifies the smallest conceptual gap and provides a targeted repair.

## Result

> **Less repetition. Better understanding. Measurable mastery.**

---

# 38. One-Line Pitch

> **Learnova AI is a learning debugger that finds the hidden prerequisite behind a student's mistake, repairs the gap, and verifies mastery through a continuous learning loop.**

---

# 39. Core Product Principle

Everything in Learnova should support one central question:

> **"Why did the student get this wrong, and how can we prove that they now understand it?"**

### The complete product loop

**Student makes a mistake → Learnova finds the reason → fixes the reason → proves the student improved.**

That is the heart of Learnova AI.

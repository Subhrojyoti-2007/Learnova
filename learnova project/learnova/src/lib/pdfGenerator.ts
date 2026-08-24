import { jsPDF } from "jspdf";
import "jspdf-autotable";

export interface Question {
  type: "1-mark" | "3-mark" | "5-mark" | "10-mark";
  question: string;
  solution: string;
}

export interface AssessmentData {
  topic: string;
  questions: Question[];
}

export const generateAssessmentPDF = (data: AssessmentData) => {
  const doc = new jsPDF();
  
  // Set fonts and colors to match Learnova branding
  // Primary color: #7c3aed (124, 58, 237)
  const primaryColor = [124, 58, 237];
  const darkBg = [21, 18, 38];
  
  let currentY = 20;

  // Title Background
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, 210, 40, "F");
  
  // Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Learnova Assessment", 20, 25);
  
  // Subtitle
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`Topic: ${data.topic}`, 20, 34);

  currentY = 50;

  // Render Questions
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Questions", 20, currentY);
  currentY += 10;

  data.questions.forEach((q, i) => {
    // Question Type Label
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`[${q.type}] Question ${i + 1}`, 20, currentY);
    currentY += 6;

    // Question Text
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    
    const splitQuestion = doc.splitTextToSize(q.question, 170);
    doc.text(splitQuestion, 20, currentY);
    
    currentY += (splitQuestion.length * 5) + 8;
    
    if (currentY > 270) {
      doc.addPage();
      currentY = 20;
    }
  });

  doc.addPage();
  currentY = 20;

  // Render Solutions
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Solutions Key", 20, currentY);
  currentY += 10;

  data.questions.forEach((q, i) => {
    // Solution Header
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`Solution ${i + 1} (${q.type})`, 20, currentY);
    currentY += 6;

    // Solution Text
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    
    const splitSolution = doc.splitTextToSize(q.solution, 170);
    doc.text(splitSolution, 20, currentY);
    
    currentY += (splitSolution.length * 5) + 10;

    if (currentY > 270) {
      doc.addPage();
      currentY = 20;
    }
  });

  // Save the PDF
  doc.save(`Learnova_Assessment_${data.topic.replace(/\s+/g, '_')}.pdf`);
};

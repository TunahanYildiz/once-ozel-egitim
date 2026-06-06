"use client";

import { useState } from 'react';
import { BrainCircuit, ArrowRight, CheckCircle2, Phone, MessageCircle } from 'lucide-react';

interface TestClientProps {
  strings: {
    pageSubtitle: string;
    questionPrefix: string;
    yes: string;
    no: string;
    next: string;
    finish: string;
    resultTitle: string;
    resultDesc: string;
    contactWhatsApp: string;
    contactPhone: string;
    questions: string[];
  };
}

export default function TestClient({ strings }: TestClientProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const totalQuestions = strings.questions.length;

  const handleAnswer = (val: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = val;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const yesCount = answers.filter((a) => a === true).length;
    // We don't diagnose, just encourage contact. But we can track yesCount internally.
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 text-center max-w-3xl mx-auto animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-[var(--color-primary)] mb-4">
          {strings.resultTitle}
        </h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {strings.resultDesc}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/905535575515"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
          >
            <MessageCircle className="w-5 h-5" />
            {strings.contactWhatsApp}
          </a>
          <a
            href="tel:+905535575515"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[var(--color-primary)] text-white font-bold rounded-full hover:bg-[var(--color-secondary)] transition-colors shadow-lg shadow-[var(--color-primary)]/30"
          >
            <Phone className="w-5 h-5" />
            {strings.contactPhone}
          </a>
        </div>
      </div>
    );
  }

  const currentQ = strings.questions[currentStep];
  const progress = ((currentStep) / totalQuestions) * 100;
  const hasAnsweredCurrent = answers[currentStep] !== undefined;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-12 shadow-2xl border border-gray-100 max-w-3xl mx-auto">
      <p className="text-center text-gray-500 mb-8">{strings.pageSubtitle}</p>
      
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-sm font-bold text-gray-400 mb-2">
          <span>{strings.questionPrefix} {currentStep + 1} / {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-10 min-h-[120px] flex items-center justify-center text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] leading-tight">
          {currentQ}
        </h3>
      </div>

      {/* Yes/No Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => handleAnswer(true)}
          className={`py-5 rounded-2xl border-2 font-bold text-xl transition-all ${
            answers[currentStep] === true
              ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]'
              : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          {strings.yes}
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className={`py-5 rounded-2xl border-2 font-bold text-xl transition-all ${
            answers[currentStep] === false
              ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/5 text-[var(--color-secondary)]'
              : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          {strings.no}
        </button>
      </div>

      {/* Next/Finish Button */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!hasAnsweredCurrent}
          className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all ${
            hasAnsweredCurrent
              ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] hover:shadow-lg hover:-translate-y-1'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentStep === totalQuestions - 1 ? strings.finish : strings.next}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

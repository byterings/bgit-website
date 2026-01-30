'use client';

import { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ question, answer, isOpen, onToggle, index }: AccordionItemProps) {
  const btnId = `accordion-btn-${index}`;
  const panelId = `accordion-panel-${index}`;

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden">
      <button
        id={btnId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full px-5 py-4 flex items-center justify-between text-left bg-[#0d0d0d] hover:bg-[#111] transition-colors"
      >
        <span className="font-semibold pr-4">{question}</span>
        <svg
          aria-hidden="true"
          className={`w-5 h-5 text-muted flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-5 py-4 text-muted text-sm bg-[#0a0a0a]">
          {answer}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          index={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}

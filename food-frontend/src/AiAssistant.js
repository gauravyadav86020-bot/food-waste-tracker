import React, { useState } from 'react';

function AiAssistant(props) {
  const foods = props.foods;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = () => {
    if (!question) return;
    setLoading(true);

    setTimeout(() => {
      const q = question.toLowerCase();
      let reply = '';

      let urgentList = [];
      for (let i = 0; i < foods.length; i++) {
        if (foods[i].status === 'URGENT') {
          urgentList.push(foods[i].name);
        }
        if (foods[i].status === 'EXPIRED') {
          urgentList.push(foods[i].name);
        }
      }
      let urgentNames = urgentList.join(', ');
      if (urgentNames === '') {
        urgentNames = 'nothing';
      }

      let type = 'other';
      if (q.includes('what to cook')) { type = 'recipe'; }
      if (q.includes('recipe')) { type = 'recipe'; }
      if (q.includes('cook')) { type = 'recipe'; }
      if (q.includes('make')) { type = 'recipe'; }
      if (q.includes('save')) { type = 'save'; }
      if (q.includes('waste')) { type = 'save'; }
      if (q.includes('how')) { type = 'save'; }
      if (q.includes('expire')) { type = 'expire'; }
      if (q.includes('expiring')) { type = 'expire'; }

      if (type === 'recipe') {
        reply = 'You have expiring food: ' + urgentNames + '. You can make Soup, Salad or Curry from it. Use it today, otherwise it will be wasted.';
      }
      if (type === 'save') {
        reply = '3 ways to save food: 1. Eat the food that expires tomorrow, today. 2. Store leftover food in the fridge. 3. Buy only as much as you need.';
      }
      if (type === 'expire') {
        reply = 'Right now in URGENT list: ' + urgentNames + '. Please use them today or tomorrow, otherwise they will get EXPIRED.';
      }
      if (type === 'other') {
        reply = 'I understood your question: ' + question + '. My suggestion is - first use the URGENT food: ' + urgentNames + '. This will spoil first.';
      }

      setAnswer(reply);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="ai-box">
      <h2>AI Assistant - Ask Anything</h2>
      <p className="ai-sub">Example: What can I cook from expiring food?</p>
      <div className="ai-input-row">
        <input
          placeholder="Ask AI..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && askAI()}
        />
        <button onClick={askAI}>Ask AI</button>
      </div>
      {loading && <p>AI is thinking...</p>}
      {answer && <div className="ai-answer">{answer}</div>}
      <div className="ai-chips">
        <button onClick={() => { setQuestion('What can I cook from expiring food?'); }}>What to Cook?</button>
        <button onClick={() => { setQuestion('How to save food from waste?'); }}>How to Save?</button>
        <button onClick={() => { setQuestion('What is expiring?'); }}>What is Expiring?</button>
      </div>
    </div>
  );
}
export default AiAssistant;
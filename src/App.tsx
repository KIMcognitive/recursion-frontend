import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';



// Initialize Firebase

if (!firebase.apps.length) {
  
} else {
  
}
const db = firebase.firestore();

function App() {
  // Sliders
  const [clarity, setClarity] = useState(50);
  const [reflection, setReflection] = useState(50);
  const [intuitionLogic, setIntuitionLogic] = useState(50);
  const [engagementReadiness, setEngagementReadiness] = useState(50);

  // Multiple choice
  const [thinkingStyle, setThinkingStyle] = useState(null);
  const [emotionalProcessing, setEmotionalProcessing] = useState(null);
  const [decisionMaking, setDecisionMaking] = useState(null);

  // Save statuses
  const [saveStatus, setSaveStatus] = useState(null);
  const [saveStatus2, setSaveStatus2] = useState(null);
  const [saveStatus3, setSaveStatus3] = useState(null);
  const [saveStatus4, setSaveStatus4] = useState(null);
  const [saveStatus5, setSaveStatus5] = useState(null);
  const [saveStatus6, setSaveStatus6] = useState(null);
  const [saveStatus7, setSaveStatus7] = useState(null);

  // Debounced sliders
  const [debouncedClarity, setDebouncedClarity] = useState(clarity);
  const [debouncedReflection, setDebouncedReflection] = useState(reflection);
  const [debouncedIntuitionLogic, setDebouncedIntuitionLogic] =
    useState(intuitionLogic);
  const [debouncedEngagementReadiness, setDebouncedEngagementReadiness] =
    useState(engagementReadiness);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const clarityDoc = await db
          .collection('onboarding')
          .doc('patternClarity')
          .get();
        if (clarityDoc.exists) setClarity(clarityDoc.data().clarityScore);

        const reflectionDoc = await db
          .collection('onboarding')
          .doc('selfReflectionConfidence')
          .get();
        if (reflectionDoc.exists)
          setReflection(reflectionDoc.data().reflectionScore);

        const intuitionDoc = await db
          .collection('onboarding')
          .doc('intuitionLogic')
          .get();
        if (intuitionDoc.exists)
          setIntuitionLogic(intuitionDoc.data().intuitionLogicScore);

        const readinessDoc = await db
          .collection('onboarding')
          .doc('engagementReadiness')
          .get();
        if (readinessDoc.exists)
          setEngagementReadiness(readinessDoc.data().readinessScore);

        const thinkingDoc = await db
          .collection('onboarding')
          .doc('thinkingStylePreference')
          .get();
        if (thinkingDoc.exists) setThinkingStyle(thinkingDoc.data().selection);

        const emotionalDoc = await db
          .collection('onboarding')
          .doc('emotionalProcessing')
          .get();
        if (emotionalDoc.exists)
          setEmotionalProcessing(emotionalDoc.data().selection);

        const decisionDoc = await db
          .collection('onboarding')
          .doc('decisionMakingStyle')
          .get();
        if (decisionDoc.exists) setDecisionMaking(decisionDoc.data().selection);
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedClarity(clarity), 500);
    return () => clearTimeout(timer);
  }, [clarity]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedReflection(reflection), 500);
    return () => clearTimeout(timer);
  }, [reflection]);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedIntuitionLogic(intuitionLogic),
      500
    );
    return () => clearTimeout(timer);
  }, [intuitionLogic]);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedEngagementReadiness(engagementReadiness),
      500
    );
    return () => clearTimeout(timer);
  }, [engagementReadiness]);

  useEffect(() => {
    if (debouncedClarity !== null) saveClarity(debouncedClarity);
  }, [debouncedClarity]);

  useEffect(() => {
    if (debouncedReflection !== null) saveReflection(debouncedReflection);
  }, [debouncedReflection]);

  useEffect(() => {
    if (debouncedIntuitionLogic !== null)
      saveIntuitionLogic(debouncedIntuitionLogic);
  }, [debouncedIntuitionLogic]);

  useEffect(() => {
    if (debouncedEngagementReadiness !== null)
      saveEngagementReadiness(debouncedEngagementReadiness);
  }, [debouncedEngagementReadiness]);

  const saveClarity = async (value) => {
    setSaveStatus('saving');
    try {
      await db.collection('onboarding').doc('patternClarity').set({
        clarityScore: value,
        timestamp: new Date(),
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (e) {
      setSaveStatus('error');
    }
  };

  const saveReflection = async (value) => {
    setSaveStatus2('saving');
    try {
      await db.collection('onboarding').doc('selfReflectionConfidence').set({
        reflectionScore: value,
        timestamp: new Date(),
      });
      setSaveStatus2('saved');
      setTimeout(() => setSaveStatus2(null), 2000);
    } catch (e) {
      setSaveStatus2('error');
    }
  };

  const saveIntuitionLogic = async (value) => {
    setSaveStatus3('saving');
    try {
      await db.collection('onboarding').doc('intuitionLogic').set({
        intuitionLogicScore: value,
        timestamp: new Date(),
      });
      setSaveStatus3('saved');
      setTimeout(() => setSaveStatus3(null), 2000);
    } catch (e) {
      setSaveStatus3('error');
    }
  };

  const saveEngagementReadiness = async (value) => {
    setSaveStatus4('saving');
    try {
      await db.collection('onboarding').doc('engagementReadiness').set({
        readinessScore: value,
        timestamp: new Date(),
      });
      setSaveStatus4('saved');
      setTimeout(() => setSaveStatus4(null), 2000);
    } catch (e) {
      setSaveStatus4('error');
    }
  };

  const saveThinkingStyle = async (option) => {
    setThinkingStyle(option);
    setSaveStatus5('saving');
    try {
      await db.collection('onboarding').doc('thinkingStylePreference').set({
        selection: option,
        timestamp: new Date(),
      });
      setSaveStatus5('saved');
      setTimeout(() => setSaveStatus5(null), 2000);
    } catch (e) {
      setSaveStatus5('error');
    }
  };

  const saveEmotionalProcessing = async (option) => {
    setEmotionalProcessing(option);
    setSaveStatus6('saving');
    try {
      await db.collection('onboarding').doc('emotionalProcessing').set({
        selection: option,
        timestamp: new Date(),
      });
      setSaveStatus6('saved');
      setTimeout(() => setSaveStatus6(null), 2000);
    } catch (e) {
      setSaveStatus6('error');
    }
  };

  const saveDecisionMaking = async (option) => {
    setDecisionMaking(option);
    setSaveStatus7('saving');
    try {
      await db.collection('onboarding').doc('decisionMakingStyle').set({
        selection: option,
        timestamp: new Date(),
      });
      setSaveStatus7('saved');
      setTimeout(() => setSaveStatus7(null), 2000);
    } catch (e) {
      setSaveStatus7('error');
    }
  };

  const handleSubmit = async () => {
    const payload = {
      patternClarity: clarity,
      selfReflectionConfidence: reflection,
      intuitionLogic: intuitionLogic,
      engagementReadiness: engagementReadiness,
      thinkingStyle: thinkingStyle,
      emotionalProcessing: emotionalProcessing,
      decisionMaking: decisionMaking,
      timestamp: new Date().toISOString(),
      source: 'standard-mvp',
    };

    try {
      const response = await fetch(
        'https://recursion-backend.onrender.com/recursion-event',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'KIMCOGNITIVE_SUPERKEY_2025',
          },

          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log('✅ Backend response:', result);
      alert('Submitted successfully!');
    } catch (error) {
      console.error('❌ Submission failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center space-y-12">
      <SliderBlock
        title="Pattern Clarity"
        value={clarity}
        onChange={setClarity}
        status={saveStatus}
      />
      <SliderBlock
        title="Self-Reflection Confidence"
        value={reflection}
        onChange={setReflection}
        status={saveStatus2}
      />
      <SliderBlock
        title="Intuition vs Logic"
        value={intuitionLogic}
        onChange={setIntuitionLogic}
        status={saveStatus3}
      />
      <SliderBlock
        title="Engagement Readiness"
        value={engagementReadiness}
        onChange={setEngagementReadiness}
        status={saveStatus4}
      />

      <MultipleChoiceBlock
        title="Thinking Style Preference"
        options={[
          'I rely heavily on intuition',
          'I like to think things through logically',
          'I shift based on context',
          "I'm not sure",
        ]}
        selected={thinkingStyle}
        onSelect={saveThinkingStyle}
        status={saveStatus5}
      />
      <MultipleChoiceBlock
        title="Emotional Processing Style"
        options={[
          'I process feelings internally',
          'I process feelings aloud',
          'I oscillate',
          'I avoid emotions',
        ]}
        selected={emotionalProcessing}
        onSelect={saveEmotionalProcessing}
        status={saveStatus6}
      />
      <MultipleChoiceBlock
        title="Decision-Making Style"
        options={[
          'I prefer quick decisions',
          'I take my time',
          'Depends on stakes',
          'I often freeze',
        ]}
        selected={decisionMaking}
        onSelect={saveDecisionMaking}
        status={saveStatus7}
      />

      {/* Final Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit All Responses
      </button>
    </div>
  );
}

// Reusable components
function SliderBlock({ title, value, onChange, status }) {
  const id = title.toLowerCase().replace(/\s+/g, '');
  return (
    <div className="w-full max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Onboarding: {title}</h2>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mb-2"
      />
      <p>
        Your response: <strong>{value}</strong>
      </p>
      {status === 'saving' && <p className="text-yellow-600">Saving...</p>}
      {status === 'saved' && <p className="text-green-600">Saved!</p>}
      {status === 'error' && (
        <p className="text-red-600">Error saving. Please try again.</p>
      )}
    </div>
  );
}

function MultipleChoiceBlock({ title, options, selected, onSelect, status }) {
  return (
    <div className="w-full max-w-xl">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-2">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(option)}
            className={`w-full p-2 border rounded ${
              selected === option
                ? 'bg-blue-100 border-blue-500'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {status === 'saving' && <p className="text-yellow-600 mt-2">Saving...</p>}
      {status === 'saved' && <p className="text-green-600 mt-2">Saved!</p>}
      {status === 'error' && (
        <p className="text-red-600 mt-2">Error saving. Please try again.</p>
      )}
    </div>
  );
}

export default App;

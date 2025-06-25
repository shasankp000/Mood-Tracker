import { useState, useEffect} from 'react'
import './App.css'
import './global.css'
import MoodButton from './components/MoodButton'
import HeaderText from './components/HeaderText'
import { AnimatePresence, motion } from "motion/react"
import MoodChart from './components/MoodChart'

function App() {

  const moods = [
    "😊 Happy",
    "😢 Sad",
    "😰 Anxious",
    "😡 Angry",
    "🥲 Nostalgic"
  ];

  const [moodIndex, setMoodIndex] = useState(null)
  const [opacity, setOpacity] = useState(1)
  const [moodLog, setMoodLog] = useState([])
  const [typewriterText, setTypewriterText] = useState('')
  const [isTyping, setIsTyping] = useState(false) // isTyping(False) so typing is over, we are good to change text.
  const [shouldType, setShouldType] = useState(false); // shouldType(false) means that there's still text in the logger and it's not been cleared.
  let content; // variable for deciding what's gonna go in the logger div.

   useEffect(() => {

    const message = "This is the mood logger area!"
    let index = 0
    setIsTyping(true) // Reset typing status to true, since there's still characters left to type out.

    const interval = setInterval(() => {
      if (index < message.length) {
        setTypewriterText(message.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        
        // Wait a bit before showing the next message
        setTimeout(() => {
          setCurrentMessageIndex(prev => (prev + 1) % messageQueue.length) // reset back to start.
        }, 1000) // wait 2s between messages

      }
    }, 60)


    return () => clearInterval(interval)
  }, [shouldType]) // shouldType is the trigger for the useEffect to restart when log is cleared.


  function HandleMoodChange() {
    setTypewriterText("") // clear out the typed text
    setIsTyping(false) // no longer typing, good to go.
    
    const randomIndex = Math.floor(Math.random() * moods.length)
    setMoodIndex(randomIndex)

    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    const moodEntry = `${timestamp} Mood set to ${moods[randomIndex]}`

    setMoodLog(prev => { // prev is a method passed into setMoodLog, provided by react.
      const updated = [...prev, moodEntry] // put the previous entries and the current entry into one single list.
      return updated.length > 10 ? updated.slice(-10) : updated // only 10 moods at a time.
    })

    setOpacity(0)
    setTimeout(() => {
      setOpacity(1)
    }, 300)

     
  }

  function handleClear() {
    setMoodLog([]) // clear the log.
    
    setOpacity(0) // fade out the header

    setTimeout(() => {
      setMoodIndex("cleared")
      setOpacity(1) // fade in to show "Log Cleared!"

      setTimeout(() => {
        // wait 2 seconds then fade out again
        setOpacity(0)

        setTimeout(() => {
          setMoodIndex(null) // set to null so that it shows the default text
          setOpacity(1) // fade in.

          setTimeout(() => {
            setShouldType(true) // wait for 0.5 seconds before retriggering the typewrite text so that the exit animations of the logger text is visible.
          }, 350) 
        }, 300)
      }, 2000)
    }, 300)
  }

  function getMoodFrequency(log) {
    const freqMap = {}

    for (let i = 0; i < log.length; i++) {
      const entry = log[i]
      const match = entry.match(/Mood set to (.+)/)

      if (match) {
        const mood = match[1]
        
        if (freqMap[mood]) {
          freqMap[mood]++
        } else {
          freqMap[mood] = 1
        }
      }
    }

    const result = []

    for (const mood in freqMap) {
      result.push({
        mood: mood,
        count: freqMap[mood]
      });
    }

    return result
  }


  if (moodLog.length === 0 && isTyping) { // moodLog is empty and isTyping is true, so we are good to type out the text.
    content = (
      <span className="text-sm text-gray-300">
        {typewriterText}
        <span className="animate-pulse">█</span>
      </span>
    )
  } else { // isTyping was set to false and there's content in the moodLog
    content = (
      <ul className="w-full">
        <AnimatePresence>
          {moodLog.map((entry, index) => (
            <motion.li
              key={index} // index within the array
              className="text-sm py-1 text-white"
              initial={{ opacity: 0, y: 10 }} // initially hidden and at a higher level
              animate={{ opacity: 1, y: 0 }} // show and bring down
              exit={{ opacity: 0, y: -10 }} // hide and send to a lower level
              transition={{ duration: 0.3 }} // all with 0.3s duration.
            >
              {entry} 
            </motion.li> 
          ))}
        </AnimatePresence>
      </ul>
    )
  }

  const moodFrequency = getMoodFrequency(moodLog);

  let chartSection;
  if (moodFrequency.length === 0) {
    chartSection = <p className="text-white mt-4">No data to plot yet</p>
  } else {
    chartSection = <MoodChart data={moodFrequency}/>
  }


  return (
    <>
      {/* Mood Section */}
      <div className="flex flex-col min-h-dvh w-screen justify-center items-center bg-gray-800">
        <HeaderText
          label={moodIndex === null ? "Change Mood!" : moodIndex === "cleared" ? "Log Cleared!" : moods[moodIndex]}
          extra="w-full sm:w-3/4 md:w-1/5 lg:w-1/8 xl:w-1/8 text-white transition-opacity duration-300 ease-in"
          style={{ opacity }}

        />
        <MoodButton label="Change Mood!" onClick={HandleMoodChange} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} />

        {/* Logger Section */}
        <div className="flex flex-col h-48 w-96 justify-center items-center bg-black text-white p-4 rounded-xl overflow-auto">
          {content}
        </div>

        <MoodButton label={"Clear"} onClick={handleClear} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}/>

        {chartSection}

      </div>
    </>
  )

}



export default App

import { FiSend } from "react-icons/fi";
import Upload from "./Upload";
import { use, useEffect, useRef, useState } from "react";
import { Image } from "@imagekit/react";
import main from "../lib/gemini.js";
import Markdown from 'react-markdown'
import '../styles/geminiMarkdown.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'


const NewPrompt = ({ data, initialPrompt }) => {
  
  const [question, setQuestion] = useState('')
  const [prompt, setPrompt] = useState('')
  const [thinking, setThinking] = useState('')
  const [answer, setAnswer] = useState('')

  const [image, setImage] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });


  const bottomRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ Behavior: "smooth" });
  }, [answer, question, thinking, image])

  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: async (userPrompt) => {
      return await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userPrompt || undefined,
          answer: answer,
          image: image.dbData.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setPrompt("");
          setAnswer("");
          setThinking(false);
          setImage({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });


  const add = async (userPrompt) => {
    let timer;

    await main(
      userPrompt,
      (chunk) => {
        setAnswer(prev => prev + chunk);

        // Reset timer on every new chunk
        clearTimeout(timer);

        timer = setTimeout(() => {
          mutation.mutate(userPrompt);

        }, 500);
      },
      image.aiData?.data ? image.aiData : undefined
    );
  };

  // const add = async () => {
  //    main(
  //     question.trim() || "",
  //     (chunk) => setAnswer(prev => prev + chunk),
  //     image.aiData?.data ? image.aiData : undefined
  //   );

  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setThinking(true);

    // store question for display
    let userPrompt = question.trim();
    setPrompt(userPrompt);

    // clear textarea
    setQuestion("");

    // run AI with the original question
    await add(userPrompt);
    setThinking(false);
  };

  // e.preventDefault();
  // if (!question.trim()) return;
  // setThinking(true);

  // add();


  return (
    <>

      {image.isLoading && <div className="flex justify-end m-4 text-gray-400 gap-2 mr-5">
        <span className="animate-pulse">●</span>
        <span className="animate-pulse delay-200">●</span>
        <span className="animate-pulse delay-400">●</span>
      </div>}
      {image.dbData?.filePath && (
        <div className="flex justify-end m-2 ">
          <Image
            className=" rounded-2xl"
            src={image.dbData?.filePath}
            width="300"
            transformation={[{ width: 300 }]}
          />
        </div>
      )}


      {prompt && <div className="flex justify-end ">
        <span className="p-2 bg-(--ternary-bg-color) rounded-2xl px-3 m-2 max-w-[80%] ">{prompt}</span>
      </div>}

      {!thinking ? answer && <div className="flex justify-start m-2 px-3 max-w-full">
        <span className="gemini-markdown"><Markdown>{answer}</Markdown></span>
      </div> : <div className="flex items-center gap-2 text-gray-400 ml-5 mb-2">
        <span className="animate-pulse">●</span>
        <span className="animate-pulse delay-100">●</span>
        <span className="animate-pulse delay-200">●</span>
      </div>}


      <div className="flex justify-end" ref={bottomRef}></div>

      <div className="px-2 pb-4 pt-1  md:px-3  text-md flex items-center   bg-(--primary-bg-color)/80  sticky z-20 bottom-0 ">

        <form action="" className="flex-1  flex gap-2 bg-blend-normal " onSubmit={handleSubmit} ref={formRef}>
          <div className=" flex-1 flex  border border-(--secondary-text-color) rounded-3xl items-center pl-4  px-2 py-1   bg-(--secondary-bg-color)  ">
            <textarea
              className="outline-none flex-1 max-h-43 w-full overflow-y-auto py-1 field-sizing-content resize-none"
              placeholder="Ask ChatAI..." name="text" disabled={thinking} value={question} onChange={(e) => setQuestion(e.target.value)} />

            <Upload setImage={setImage} />
          </div>
          <button type="submit" disabled={thinking}
            className="p-4 flex bg-blue-500 text-white rounded-full hover:bg-blue-600 place-self-end cursor-pointer">
            <span><FiSend className="text-xl" /></span>
          </button>

        </form>
      </div>
    </>
  )
}

export default NewPrompt
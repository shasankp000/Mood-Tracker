import { motion } from "motion/react"

function MoodButton({label="Button", height="h-12", width="w-1/2 sm:w-3/4 md:w-1/5 lg:w-1/8 xl:w-1/8", bg_color="bg-blue-700", bg_color_hover="hover:bg-blue-500", text_color="text-white", font_size="text-lg", border_radius="rounded-md", margin="m-8", extra="", onClick, ...motionProps}) {
    const baseStyle = `${height} ${width} ${bg_color} ${bg_color_hover} ${text_color} ${font_size} ${margin} ${border_radius} duration-300 ease-in ${extra}`

    return (
        <motion.button
         onClick={onClick}
         className={baseStyle}
         {...motionProps}
         >
          {label}
        </motion.button>
    );
}

export default MoodButton
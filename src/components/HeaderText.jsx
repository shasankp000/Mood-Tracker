function HeaderText({label="Header", font_size="text-2xl", margin="m-8", extra="", style={}, ...motionProps}) {
    const baseStyle = `${font_size} ${margin} ${extra}`
    return (
        <h1
        className={baseStyle}
        style={style}
        {...motionProps}
        >
            {label}
        </h1>
    )

}

export default HeaderText
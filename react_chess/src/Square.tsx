import React from "react";
interface Props {
    content: string
    pos: string
    color: string
}

export let Square = (props: Props): JSX.Element => {
    return (
        <div className={"square" + " " + props.pos + " " + props.color} id={props.pos}>
            <h1>{props.content}</h1>
        </div>
    )
}


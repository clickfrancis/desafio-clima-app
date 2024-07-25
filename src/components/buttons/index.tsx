import React from "react";

class ButtonApp extends React.Component<{ text: string , className?: string}> {
    render() {
        return (
            <button className={this.props.className}>
                {this.props.text}
            </button>
        )
    }
}

export default ButtonApp;
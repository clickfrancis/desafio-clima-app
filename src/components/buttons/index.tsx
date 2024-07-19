import React from "react";

class ButtonApp extends React.Component<{ text: string }> {
    render() {
        return (
            <button>
                {this.props.text}
            </button>
        )
    }
}

export default ButtonApp;
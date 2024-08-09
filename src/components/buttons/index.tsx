import React from "react";

class ButtonApp extends React.Component<{ text: string , className?: string, onClick?: () => void}> {
    render() {
        return (
            <button
                onClick = {this.props.onClick|| undefined}
                className={this.props.className}>
                {this.props.text}
            </button>
        )
    }
}

export default ButtonApp;
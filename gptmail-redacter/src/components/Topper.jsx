import React from 'react';

const Topper = () => {
    return (
        <header>
            <nav className='navbar'>
            <div class="logo">
                <a href="https://www.atlassian.com/software/jira">
                    <img src="https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png" alt="Atlassian Logo"/>
                </a>
            </div>
            <div class="jira-title">
                <img src="jira.png" alt="Jira Logo" class="jira-logo"/>
                <span class="title">GPTMail Redacter</span>
            </div>
            </nav>
        </header>
    );
};

export default Topper;

import React from "react";
import { FooterItems } from "../../config/SiteData";

export default function Footer() {
    return (
        <footer>
            <div className="top">
                <div className="container">
                    <div className="about">
                        <div>
                            <div className="logo"></div>
                            <div className="desc">
                                <p dangerouslySetInnerHTML={{ __html: FooterItems.desc }}></p>
                                <p>
                                    <a href="https://twitter.com/fmoviesdotto" target="_blank" rel="noreferrer">
                                        <i className="fab fa-twitter"></i> Connect with us on twitter
                                    </a>
                                </p>
                                <p className="small font-italic">{FooterItems.warning}</p>
                            </div>
                        </div>
                    </div>
                    <div className="links">
                        <div className="bl">
                            <div className="heading">Links</div>
                            <ul>
                                {FooterItems.links.map((item) => (
                                    <li key={item.id}>
                                        <a href={item.link}>{item.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bl">
                            <div className="heading"></div>
                            <ul>
                                {FooterItems.externalLinks.map((item) => (
                                    <li key={item.id}>
                                        <a href={item.link} title={item.name} target="_blank" rel="noreferrer">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bl">
                            <div className="heading"></div>
                            <ul>
                                <li>
                                    <a href={FooterItems.contact.link} title="Contact us">
                                        {FooterItems.contact.name}
                                    </a>
                                </li>
                                <li>
                                    <a href={FooterItems.request.link} data-toggle="modal" data-target="#md-request">
                                        {FooterItems.request.name}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        </footer>
    );
}

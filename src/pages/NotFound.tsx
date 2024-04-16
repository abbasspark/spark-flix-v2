import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const NotFound = () => {
    return (
        <div className="wrapper">
            <main>
                <div id="error">
                    <div className="container sm">
                        <div className="flex-column justify-content-center">
                            <div className="code">404 - Page Not Found</div>
                            <p className="desc mb-4 fw-bold">
                                We couldn't find the page you're looking for.
                            </p>
                            <Link to="/" className="btn btn-primary" title="Go to Homepage">
                                <i className="bi bi-house"></i> Go to Homepage
                            </Link>
                        </div>
                        <div className="col-12 col-md-6 p-3">  </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotFound;

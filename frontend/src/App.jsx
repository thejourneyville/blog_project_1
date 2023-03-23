import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UpdateContextProvider } from "./context/UpdateContext";
import { FetchContextProvider } from "./context/FetchContext";

// pages and components
import PostEntryPage from "./pages/PostEntryPage";
import DisplayPostsPage from "./pages/DisplayPostsPage";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="App">
            <FetchContextProvider>
                <UpdateContextProvider>
                    <BrowserRouter>
                        <Navbar />
                        <div className="pages">
                            <Routes>
                                <Route
                                    path="/post-entry"
                                    element={<PostEntryPage />}
                                />
                                <Route
                                    path="/posts"
                                    element={<DisplayPostsPage />}
                                />
                            </Routes>
                        </div>
                    </BrowserRouter>
                </UpdateContextProvider>
            </FetchContextProvider>
        </div>
    );
}

export default App;

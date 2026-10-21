import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/sections/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen } from "lucide-react";
import { booksData } from "@/data/bookReviews";
import ImageViewer from "@/components/books/ImageViewer";
import { useSEO } from "@/hooks/useSEO";
import { createBookStructuredData } from "@/utils/seoUtils";

const WhyAmIHereBook = () => {
  const book = booksData.find((b) => b.id === "why-am-i-here");
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: "Why Am I Here? Who Am I? | Books by Maggie",
    description:
      "A faith-filled children's picture book about God-given identity, love, and purpose, with Maggie and Matteo.",
    keywords: ["Christian children's book", "identity in Christ", "Maggie the Yorkie", "God's purpose for kids"],
    structuredData: book ? createBookStructuredData(book) : null,
  });

  if (!book) return <div>Book not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/" className="hover:text-primary">Books</Link>
            <span className="mx-2">›</span>
            <span className="text-foreground">Why Am I Here? Who Am I?</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <img
              src={book.coverImage}
              alt="Why Am I Here? Who Am I? book cover featuring Maggie and a little girl"
              className="w-full max-w-md mx-auto rounded-2xl shadow-xl cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setEnlargedImage(book.coverImage)}
            />

            <div className="space-y-6">
              <div>
                <Badge className="mb-3">New Release</Badge>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  Why Am I Here? Who Am I?
                </h1>
                <p className="text-xl font-semibold text-primary mb-4">God Given Identity, Love, and Purpose</p>
                <p className="text-sm text-muted-foreground mb-4">Story by Norman Pettus · Told by Maggie</p>
                <p className="text-lg text-foreground/80 leading-relaxed">{book.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">What Children Will Discover</h2>
                <ul className="text-foreground/80 space-y-1">
                  <li>• God made them on purpose, for a purpose</li>
                  <li>• They are known and deeply loved by God</li>
                  <li>• Their identity comes from God, not from others</li>
                  <li>• Every person is valuable in God's eyes</li>
                  <li>• God's Word answers life's biggest questions</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Inside the Book</h2>
                <ul className="text-foreground/80 space-y-1">
                  <li>• Warm illustrations with Maggie and Matteo</li>
                  <li>• "God's Word" Scripture boxes on the pages</li>
                  <li>• Simple language perfect for family read-alouds</li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {book.languages.map((l) => (
                  <Badge key={l} variant="outline">{l}</Badge>
                ))}
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                  <a href={book.amazonLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Buy Paperback on Amazon
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link to="/join">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read it in Maggie's Reading Club
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageViewer enlargedImage={enlargedImage} onClose={() => setEnlargedImage(null)} />
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default WhyAmIHereBook;

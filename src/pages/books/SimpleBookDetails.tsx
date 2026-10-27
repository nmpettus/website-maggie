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

interface Props {
  bookId: string;
  shortTitle: string;
  subtitle?: string;
  seoDescription: string;
  keywords: string[];
  discover: string[];
  inside: string[];
}

const SimpleBookDetails = ({ bookId, shortTitle, subtitle, seoDescription, keywords, discover, inside }: Props) => {
  const book = booksData.find((b) => b.id === bookId);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: `${shortTitle} | Books by Maggie`,
    description: seoDescription,
    keywords,
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
            <span className="text-foreground">{shortTitle}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <img
              src={book.coverImage}
              alt={`${shortTitle} book cover`}
              className="w-full max-w-md mx-auto rounded-2xl shadow-xl cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setEnlargedImage(book.coverImage)}
            />

            <div className="space-y-6">
              <div>
                {book.isNew && <Badge className="mb-3">New Release</Badge>}
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">{shortTitle}</h1>
                {subtitle && <p className="text-xl font-semibold text-primary mb-4">{subtitle}</p>}
                <p className="text-sm text-muted-foreground mb-4">Story by Norman Pettus · Told by Maggie</p>
                <p className="text-lg text-foreground/80 leading-relaxed">{book.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">What Children Will Discover</h2>
                <ul className="text-foreground/80 space-y-1">
                  {discover.map((d) => <li key={d}>• {d}</li>)}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Inside the Book</h2>
                <ul className="text-foreground/80 space-y-1">
                  {inside.map((d) => <li key={d}>• {d}</li>)}
                </ul>
              </div>

              <div className="space-y-3">
                {book.amazonLink && (
                  <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                    <a href={book.amazonLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Buy Paperback on Amazon
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link to="/join">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read it in Maggie's Reading Club
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {book.samplePages.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">Peek Inside</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {book.samplePages.map((p) => (
                  <img
                    key={p.src}
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="w-full rounded-xl shadow-md cursor-pointer transition-transform hover:scale-[1.03]"
                    onClick={() => setEnlargedImage(p.src)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <ImageViewer enlargedImage={enlargedImage} onClose={() => setEnlargedImage(null)} />
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default SimpleBookDetails;

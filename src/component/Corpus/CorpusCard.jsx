// CorpusItem.jsx
export default function CorpusItem({ title, language, documents }) {
    return (
      <div className="bg-card rounded-lg p-4 border border-border hover:shadow-md transition-shadow">
        <h3 className="font-medium mb-2">{title}</h3>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{language}</span>
          <span>{documents} documents</span>
        </div>
      </div>
    );
  }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const NewStudy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const doctorName = "doctor1";
  const doctorTitle = "Dr. " + doctorName;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one DICOM file",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically upload the files and save the study
    toast({
      title: "Success",
      description: "Study uploaded successfully",
    });
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header Section */}
      <header className="glass-card border-b border-border/50 px-12 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="gap-2 hover:scale-105 smooth-transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gradient">New Study</h1>
              <p className="text-sm text-muted-foreground mt-1">Upload and analyze echocardiogram</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Doctor Info */}
            <div className="glass-card px-6 py-4 flex items-center gap-3 animate-fade-in">
              <Avatar className="h-11 w-11 gradient-brand">
                <AvatarFallback className="bg-transparent text-white font-semibold">
                  {doctorName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">{doctorTitle}</p>
                <p className="text-xs text-muted-foreground">Cardiologist</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-12 py-12">
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* File Upload Card */}
            <div className="glass-card p-10 animate-fade-in">
              <div className="space-y-6">
                <div className="relative border-2 border-dashed border-border rounded-2xl p-16 text-center hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] smooth-transition group">
                  <input
                    type="file"
                    id="fileUpload"
                    multiple
                    accept=".dcm,.dicom"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="cursor-pointer flex flex-col items-center gap-6"
                  >
                    <div className="w-24 h-24 rounded-full gradient-brand/10 flex items-center justify-center group-hover:scale-110 smooth-transition">
                      <Upload className="w-12 h-12 text-primary group-hover:scale-110 smooth-transition" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-muted-foreground">
                        DICOM files (.dcm, .dicom) - Max 500MB per file
                      </p>
                    </div>
                  </label>
                </div>

                {/* Selected Files List */}
                {selectedFiles.length > 0 && (
                  <div className="space-y-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
                    <Label className="text-base font-semibold text-foreground">
                      Selected Files ({selectedFiles.length})
                    </Label>
                    <div className="space-y-3">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="glass-card p-5 flex items-center justify-between group hover:bg-muted/30 hover:shadow-lg smooth-transition animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl gradient-brand/20 flex items-center justify-center group-hover:scale-105 smooth-transition">
                              <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{file.name}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFile(index)}
                            className="opacity-50 group-hover:opacity-100 smooth-transition hover:bg-destructive/10 hover:text-destructive hover:scale-110"
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="gap-2 h-12 px-8 hover:scale-105 smooth-transition"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                className="gap-2 h-12 px-8 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Upload className="w-5 h-5" />
                Upload Study
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewStudy;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, FileText, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import horalixLogo from "@/assets/horalix-logo.png";

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
      <header className="glass-card border-b border-border/50 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <img src={horalixLogo} alt="Horalix Pulse" className="h-12 w-12" />
            <div>
              <h1 className="text-2xl font-bold text-gradient">New Study</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Upload and analyze echocardiogram</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Doctor Info */}
            <div className="glass-card px-5 py-3 flex items-center gap-3">
              <Avatar className="h-10 w-10 gradient-brand">
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

      <div className="container mx-auto px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Card */}
            <div className="glass-card p-8 space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Upload DICOM Files</h2>
                  <p className="text-sm text-muted-foreground">Patient information will be extracted from DICOM metadata</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 smooth-transition">
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
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full gradient-brand/10 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        DICOM files (.dcm, .dicom) - Max 500MB per file
                      </p>
                    </div>
                  </label>
                </div>

                {/* Selected Files List */}
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Selected Files ({selectedFiles.length})
                    </Label>
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="glass-card p-4 flex items-center justify-between group hover:bg-muted/30 smooth-transition"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg gradient-brand/20 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFile(index)}
                            className="opacity-0 group-hover:opacity-100 smooth-transition hover:bg-destructive/10 hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="gap-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
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

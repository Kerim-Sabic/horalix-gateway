import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, FileText, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import horalixLogo from "@/assets/horalix-logo.png";
import { z } from "zod";

const newStudySchema = z.object({
  studyType: z.string().min(1, "Study type is required"),
  date: z.string().min(1, "Date is required"),
});

const NewStudy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    studyType: "",
    date: new Date().toISOString().split('T')[0],
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  const doctorName = "doctor1";
  const doctorTitle = "Dr. " + doctorName;

  const studyTypes = [
    "Transthoracic Echo",
    "Transesophageal Echo",
    "Stress Echo",
    "3D Echo",
    "Dobutamine Stress Echo",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      newStudySchema.parse(formData);
      
      if (selectedFiles.length === 0) {
        toast({
          title: "Error",
          description: "Please upload at least one DICOM file",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Study created successfully",
      });
      
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header Section */}
      <header className="glass-card border-b border-border/50 px-10 py-6 h-18">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Button>
            <img src={horalixLogo} alt="Horalix Pulse" className="h-12 w-12" />
            <div>
              <h1 className="text-ios-title1 font-bold text-gradient">New Study</h1>
              <p className="text-ios-footnote text-muted-foreground mt-0.5">Upload and analyze echocardiogram</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="glass-card px-5 py-3 flex items-center gap-3">
              <Avatar className="h-11 w-11 gradient-brand">
                <AvatarFallback className="bg-transparent text-white font-semibold">
                  {doctorName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-ios-headline text-foreground">{doctorTitle}</p>
                <p className="text-ios-footnote text-muted-foreground">Cardiologist</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-10 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Single Upload-Focused Card */}
            <div className="ios-card rounded-2xl p-10 space-y-8 animate-spring-in min-h-[600px]">
              {/* Study Details at Top */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="studyType" className="text-ios-footnote font-semibold text-foreground">
                    Study Type *
                  </Label>
                  <select
                    id="studyType"
                    value={formData.studyType}
                    onChange={(e) => handleInputChange("studyType", e.target.value)}
                    className={cn(
                      "flex h-13 w-full rounded-xl border-2 bg-transparent px-4 py-3 text-ios-body ring-offset-background focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-200",
                      errors.studyType ? "border-destructive" : "border-border"
                    )}
                  >
                    <option value="">Select study type</option>
                    {studyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.studyType && (
                    <p className="text-ios-caption text-destructive">{errors.studyType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-ios-footnote font-semibold text-foreground">
                    Study Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className={errors.date ? "border-destructive" : ""}
                  />
                  {errors.date && (
                    <p className="text-ios-caption text-destructive">{errors.date}</p>
                  )}
                </div>
              </div>

              {/* Large DICOM Upload Dropzone */}
              <div className="space-y-4">
                <Label className="text-ios-footnote font-semibold text-foreground">
                  Upload DICOM Files *
                </Label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    "border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 min-h-[400px] flex flex-col items-center justify-center",
                    isDragging 
                      ? "border-primary bg-primary/5 scale-[1.02]" 
                      : "border-border hover:border-primary/50"
                  )}
                >
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
                    className="cursor-pointer flex flex-col items-center gap-6 w-full"
                  >
                    <div className="w-24 h-24 rounded-full gradient-brand/10 flex items-center justify-center animate-pulse">
                      <Upload className="w-12 h-12 text-primary" />
                    </div>
                    <div>
                      <p className="text-ios-title2 text-foreground mb-2">
                        {isDragging ? "Drop files here" : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-ios-subhead text-foreground/60">
                        DICOM files only (Max 500MB per file)
                      </p>
                    </div>
                  </label>
                </div>

                {/* Selected Files List */}
                {selectedFiles.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-ios-footnote font-semibold text-foreground">
                      Selected Files ({selectedFiles.length})
                    </Label>
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="ios-card rounded-xl p-4 flex items-center justify-between hover:bg-muted/30 transition-colors duration-200 animate-spring-in h-18"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl gradient-brand/20 flex items-center justify-center">
                              <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="text-ios-headline text-foreground">{file.name}</p>
                              <p className="text-ios-footnote text-foreground/60">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFile(index)}
                            className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive"
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
            <div className="flex items-center justify-end gap-4 animate-spring-in" style={{ animationDelay: "100ms" }}>
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
                size="lg"
                className="gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Study
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewStudy;

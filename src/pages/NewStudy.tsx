import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, FileText, User, Calendar, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import horalixLogo from "@/assets/horalix-logo.png";
import { z } from "zod";

const newStudySchema = z.object({
  patientName: z.string().trim().min(1, "Patient name is required").max(100, "Name must be less than 100 characters"),
  patientId: z.string().trim().min(1, "Patient ID is required").max(50, "Patient ID must be less than 50 characters"),
  studyType: z.string().min(1, "Study type is required"),
  date: z.string().min(1, "Date is required"),
});

const NewStudy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    studyType: "",
    date: new Date().toISOString().split('T')[0],
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    // Clear error for this field
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

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    try {
      newStudySchema.parse(formData);
      
      if (selectedFiles.length === 0) {
        toast({
          title: "Error",
          description: "Please upload at least one file",
          variant: "destructive",
        });
        return;
      }

      // Here you would typically upload the files and save the study
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
            {/* Patient Information Card */}
            <div className="glass-card p-8 space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Patient Information</h2>
                  <p className="text-sm text-muted-foreground">Enter patient details</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="patientName" className="text-sm font-medium text-foreground">
                    Patient Name *
                  </Label>
                  <Input
                    id="patientName"
                    placeholder="Enter patient name"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange("patientName", e.target.value)}
                    className={errors.patientName ? "border-destructive" : ""}
                  />
                  {errors.patientName && (
                    <p className="text-xs text-destructive">{errors.patientName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patientId" className="text-sm font-medium text-foreground">
                    Patient ID *
                  </Label>
                  <Input
                    id="patientId"
                    placeholder="e.g., PT-2024-001"
                    value={formData.patientId}
                    onChange={(e) => handleInputChange("patientId", e.target.value)}
                    className={errors.patientId ? "border-destructive" : ""}
                  />
                  {errors.patientId && (
                    <p className="text-xs text-destructive">{errors.patientId}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studyType" className="text-sm font-medium text-foreground">
                    Study Type *
                  </Label>
                  <select
                    id="studyType"
                    value={formData.studyType}
                    onChange={(e) => handleInputChange("studyType", e.target.value)}
                    className={`flex h-12 w-full rounded-lg border-b-2 ${
                      errors.studyType ? "border-destructive" : "border-border"
                    } bg-transparent px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:border-primary focus-visible:ring-0 smooth-transition`}
                  >
                    <option value="">Select study type</option>
                    {studyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.studyType && (
                    <p className="text-xs text-destructive">{errors.studyType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-foreground">
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
                    <p className="text-xs text-destructive">{errors.date}</p>
                  )}
                </div>
              </div>
            </div>

            {/* File Upload Card */}
            <div className="glass-card p-8 space-y-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Upload Files</h2>
                  <p className="text-sm text-muted-foreground">Upload DICOM files or echocardiogram data</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 smooth-transition">
                  <input
                    type="file"
                    id="fileUpload"
                    multiple
                    accept=".dcm,.dicom,.jpg,.jpeg,.png,.mp4,.avi"
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
                        DICOM, JPG, PNG, MP4, AVI (Max 500MB per file)
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
            <div className="flex items-center justify-end gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
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
                <Plus className="w-4 h-4" />
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

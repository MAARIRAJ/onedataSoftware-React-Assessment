import React, { useState } from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Button, Modal } from "react-bootstrap";
import skillsData from "../data/skills.json";
import { useDispatch } from "react-redux";
import { addApplication, markAsApplied } from "../redux/jobSlice";
import ErrorBoundary from "./ErrorBoundary";
import draftToHtml from "draftjs-to-html";
import { ApplicationFormValues } from "../types/ApplicationFormValues";

interface ApplicationFormProps {
  jobId: number;
  onClose: () => void;
  onApplySuccess: (jobId: number) => void;
}

const skillOptions = skillsData.map((skill: string) => ({
  label: skill,
  value: skill,
}));

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  skills: Yup.array().min(1, "Select at least one skill"),
  aboutMe: Yup.string().required("Required"),
});

export default function ApplicationForm({
  jobId,
  onClose,
  onApplySuccess,
}: ApplicationFormProps) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  return (
    <div className="container mt-4">
      <h4>Apply for Job</h4>
      <Formik<ApplicationFormValues>
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          skills: [],
          aboutMe: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const contentState = editorState.getCurrentContent();
          const rawContent = convertToRaw(contentState);
          const aboutMeText = JSON.stringify(rawContent);
          const aboutMeHTML = draftToHtml(rawContent);

          const finalValues = {
            ...values,
            aboutMe: aboutMeText,
            aboutMeHTML,
          };

          console.log("Submitted:", finalValues);
          dispatch(markAsApplied(jobId));
          dispatch(addApplication({ jobId, formData: finalValues }));
          onApplySuccess(jobId);
          setShowConfirm(true);
          resetForm();
          setEditorState(EditorState.createEmpty());
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="mb-3">
              <label>First Name</label>
              <Field name="firstName" className="form-control" />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label>Last Name</label>
              <Field name="lastName" className="form-control" />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <Field name="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label>Skills</label>
              <Select
                isMulti
                name="skills"
                options={skillOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selected) => setFieldValue("skills", selected)}
              />
              <ErrorMessage
                name="skills"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label>About Me</label>
              <ErrorBoundary>
                <div className="border p-2" style={{ minHeight: "150px" }}>
                  <Editor
                    editorState={editorState}
                    onChange={(newState) => {
                      setEditorState(newState);
                      const content = newState.getCurrentContent();
                      setFieldValue(
                        "aboutMe",
                        content.hasText() ? "draft-content" : ""
                      );
                    }}
                  />
                </div>
              </ErrorBoundary>
              <ErrorMessage
                name="aboutMe"
                component="div"
                className="text-danger mt-2"
              />
            </div>

            <Button type="submit" variant="success">
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      <Modal
        show={showConfirm}
        onHide={() => {
          setShowConfirm(false);
          onClose();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Application is Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your application was successfully submitted!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setShowConfirm(false);
              onClose();
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

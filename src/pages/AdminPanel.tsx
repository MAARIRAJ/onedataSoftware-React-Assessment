import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addJob, deleteJob } from "../redux/jobSlice";
import { Button, Form, Modal, Badge } from "react-bootstrap";
import { AdminJobForm } from "../types/AdminJobForm";
import { Job } from "../types/Job"; 
import { RootState } from "../redux/store";

export default function AdminPanel() {
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const dispatch = useDispatch();

  const [form, setForm] = useState<AdminJobForm>({
    title: "",
    company: "",
    experience: "",
    skills: "",
    description: "",
    logo: "",
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newJob: Job = {
      id: Date.now(),
      title: form.title,
      company: form.company,
      experience: parseInt(form.experience),
      skills: form.skills.split(",").map((s) => s.trim()),
      description: form.description,
      logo: form.logo,
      applied: false,
    };

    dispatch(addJob(newJob));
    setShowModal(false);
    setForm({
      title: "",
      company: "",
      experience: "",
      skills: "",
      description: "",
      logo: "",
    });
  };

  return (
    <div className="container mt-4">
      <h3>Admin Panel — Manage Jobs</h3>

      <Button className="my-3" onClick={() => setShowModal(true)}>
        Add Job
      </Button>

      {jobs.map((job) => (
        <div key={job.id} className="p-3 border rounded mb-2">
          <div className="d-flex justify-content-between">
            <div>
              <strong>{job.title}</strong> at{" "}
              <span className="text-muted">{job.company}</span>
              <div>
                {job.skills.map((s, i) => (
                  <Badge key={i} bg="info" className="me-1">
                    {s}
                  </Badge>
                ))}
              </div>
              <div className="text-muted">Experience: {job.experience} yrs</div>
            </div>
            <div>
              <Button
                variant="danger"
                onClick={() => dispatch(deleteJob(job.id))}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Experience (in years)</Form.Label>
              <Form.Control
                type="number"
                required
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Skills (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                required
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Logo URL</Form.Label>
              <Form.Control
                type="text"
                value={form.logo}
                onChange={(e) => setForm({ ...form, logo: e.target.value })}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Save Job
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

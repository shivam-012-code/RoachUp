#!/usr/bin/env python3
"""
RoachUp Full-Stack Real-Time Server
Built with Python 3 (Threaded HTTP + REST API + SSE Real-Time Event Stream + Permanent JSON Database)
"""

import http.server
import socketserver
import json
import os
import sys
import time
import threading
import queue

PORT = 8080
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database.json')

# Real-Time Event Dispatcher (SSE Clients)
sse_clients = []
sse_lock = threading.Lock()

def broadcast_event(event_type, data):
    """Broadcast real-time JSON event to all connected SSE clients."""
    payload = f"event: {event_type}\ndata: {json.dumps(data)}\n\n"
    with sse_lock:
        to_remove = []
        for client_queue in sse_clients:
            try:
                client_queue.put_nowait(payload)
            except Exception:
                to_remove.append(client_queue)
        for q in to_remove:
            if q in sse_clients:
                sse_clients.remove(q)

# Initial Seed Data for Permanent Storage
DEFAULT_DB = {
    "students": [
        {
            "id": "std-101",
            "name": "Rohan Sharma",
            "email": "rohan.s@du.ac.in",
            "phone": "9876543210",
            "college": "Delhi University (North Campus)",
            "location": "New Delhi, Delhi",
            "rating": 4.9,
            "reviewsCount": 14,
            "walletBalance": 4250,
            "feeStatus": "Paid ₹299",
            "idStatus": "Approved",
            "idCardUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=60",
            "txnId": "TXN-ROACH-89201",
            "joinedDate": "15 Aug 2026",
            "appliedGigs": ["gig-201"]
        },
        {
            "id": "std-102",
            "name": "Ananya Patel",
            "email": "ananya@iitb.ac.in",
            "phone": "9812345678",
            "college": "IIT Bombay",
            "location": "Powai, Mumbai",
            "rating": 4.8,
            "reviewsCount": 9,
            "walletBalance": 2800,
            "feeStatus": "Paid ₹299",
            "idStatus": "Approved",
            "idCardUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60",
            "txnId": "TXN-ROACH-77412",
            "joinedDate": "16 Aug 2026",
            "appliedGigs": ["gig-202"]
        },
        {
            "id": "std-103",
            "name": "Karthik Raja",
            "email": "karthik@christuniversity.in",
            "phone": "9765432109",
            "college": "Christ University",
            "location": "Hosur Road, Bangalore",
            "rating": 4.7,
            "reviewsCount": 6,
            "walletBalance": 1500,
            "feeStatus": "Paid ₹299",
            "idStatus": "Approved",
            "idCardUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60",
            "txnId": "TXN-ROACH-66311",
            "joinedDate": "18 Aug 2026",
            "appliedGigs": []
        }
    ],
    "customers": [
        {
            "id": "cust-501",
            "name": "Vikram Mehta",
            "company": "Apex Events & Media",
            "email": "vikram@apexevents.com",
            "phone": "9899001122",
            "location": "South Delhi",
            "rating": 4.8
        },
        {
            "id": "cust-502",
            "name": "Priya Nair",
            "company": "TechCampus India",
            "email": "priya@techcampus.in",
            "phone": "9877112233",
            "location": "Koramangala, Bangalore",
            "rating": 4.9
        }
    ],
    "gigs": [
        {
            "id": "gig-201",
            "title": "Campus Music Fest Event Operations Manager",
            "category": "Event Staff",
            "employerId": "cust-501",
            "employerName": "Apex Events & Media",
            "employerRating": 4.8,
            "location": "Delhi University, North Campus",
            "pay": 1200,
            "hours": "6 Hours (Weekend)",
            "description": "Manage guest check-ins, VIP ushering, and stage logistics for campus music fest.",
            "status": "Active",
            "applicants": ["std-101"]
        },
        {
            "id": "gig-202",
            "title": "Brand Ambassador for Youth Fintech App",
            "category": "Campus Ambassador",
            "employerId": "cust-502",
            "employerName": "TechCampus India",
            "employerRating": 4.9,
            "location": "IIT Bombay & Nearby Colleges",
            "pay": 1800,
            "hours": "Flexible 10 Hrs / Week",
            "description": "Promote student savings app on campus, organize workshop, and onboard student users.",
            "status": "Active",
            "applicants": ["std-102"]
        },
        {
            "id": "gig-203",
            "title": "Social Media Reel Creator & Graphic Assistant",
            "category": "Content & Marketing",
            "employerId": "cust-501",
            "employerName": "Apex Events & Media",
            "employerRating": 4.8,
            "location": "Remote / Work from Campus",
            "pay": 900,
            "hours": "4 Hours / Project",
            "description": "Create 3 engaging Instagram reels and posters showcasing student life & event highlights.",
            "status": "Active",
            "applicants": []
        },
        {
            "id": "gig-204",
            "title": "Academic Survey & Market Data Collector",
            "category": "Research & Survey",
            "employerId": "cust-502",
            "employerName": "TechCampus India",
            "employerRating": 4.9,
            "location": "Bangalore University Hub",
            "pay": 750,
            "hours": "3 Hours",
            "description": "Collect 50 filled survey forms from college students regarding career preferences.",
            "status": "Active",
            "applicants": []
        },
        {
            "id": "gig-301",
            "title": "⚡ 30-Min Fast Campus Flyer Distribution",
            "category": "Quick Task",
            "isQuickTask": True,
            "employerId": "cust-501",
            "employerName": "Apex Events & Media",
            "employerRating": 4.8,
            "location": "DU North Campus Metro Gate",
            "pay": 350,
            "hours": "30 Mins",
            "description": "Distribute 40 concert flyers to students near metro gate. Takes 30 mins, fast payout!",
            "status": "Active",
            "applicants": []
        },
        {
            "id": "gig-302",
            "title": "⚡ 30-Min App Feedback & User Testing",
            "category": "Quick Task",
            "isQuickTask": True,
            "employerId": "cust-502",
            "employerName": "TechCampus India",
            "employerRating": 4.9,
            "location": "Remote / Online Task",
            "pay": 250,
            "hours": "30 Mins",
            "description": "Test a new student savings UI and record a 3-minute video feedback. Instant payout!",
            "status": "Active",
            "applicants": []
        },
        {
            "id": "gig-303",
            "title": "⚡ 40-Min Seminar Hall Desk Setup",
            "category": "Quick Task",
            "isQuickTask": True,
            "employerId": "cust-501",
            "employerName": "Apex Events & Media",
            "employerRating": 4.8,
            "location": "IIT Bombay Auditorium",
            "pay": 450,
            "hours": "40 Mins",
            "description": "Help arrange 2 banner standees and QR code cards before guest seminar starts.",
            "status": "Active",
            "applicants": []
        }
    ],
    "revenue": [
        {"txnId": "TXN-ROACH-89201", "studentName": "Rohan Sharma", "contact": "9876543210", "amount": 299, "method": "UPI GPay", "date": "15 Aug 2026, 14:20"},
        {"txnId": "TXN-ROACH-77412", "studentName": "Ananya Patel", "contact": "9812345678", "amount": 299, "method": "PhonePe UPI", "date": "16 Aug 2026, 11:45"},
        {"txnId": "TXN-ROACH-66311", "studentName": "Karthik Raja", "contact": "9765432109", "amount": 299, "method": "Debit Card", "date": "18 Aug 2026, 19:10"}
    ],
    "founder": {
        "name": "Rishi Choudhary",
        "role": "Founder & Team Leader",
        "email": "roachup@gmail.com",
        "bio": "Rishi is a passionate student entrepreneur who recognized the challenge that students face in balancing academics with income generation. Under his leadership, RoachUp has grown faster into a trusted network connecting verified students with local and remote micro-tasks.",
        "vision": "RoachUp was founded with a clear mission: to enable college and university students to achieve financial independence, build professional experience, and land flexible part-time tasks while studying."
    },
    "feedbacks": [
        {"name": "Vikram Mehta", "email": "vikram@apexevents.com", "rating": "5", "text": "RoachUp made hiring campus event coordinators incredibly fast and seamless!", "date": "18 Aug 2026"}
    ]
}

def load_database():
    if not os.path.exists(DB_FILE):
        save_database(DEFAULT_DB)
        return DEFAULT_DB
    try:
        with open(DB_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return DEFAULT_DB

def save_database(data):
    try:
        with open(DB_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error saving DB: {e}")

class RoachUpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Allow CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, status, payload):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        url = self.path.split('?')[0]

        # 1. Real-Time Server-Sent Events (SSE) Stream
        if url == '/api/events':
            self.send_response(200)
            self.send_header('Content-Type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'keep-alive')
            self.end_headers()

            client_q = queue.Queue()
            with sse_lock:
                sse_clients.append(client_q)

            # Send initial ping event
            try:
                self.wfile.write(b"event: connected\ndata: {\"status\": \"online\"}\n\n")
                self.wfile.flush()
                while True:
                    try:
                        msg = client_q.get(timeout=25)
                        self.wfile.write(msg.encode('utf-8'))
                        self.wfile.flush()
                    except queue.Empty:
                        # Send heartbeat ping every 25 seconds
                        self.wfile.write(b": ping\n\n")
                        self.wfile.flush()
            except Exception:
                pass
            finally:
                with sse_lock:
                    if client_q in sse_clients:
                        sse_clients.remove(client_q)
            return

        # 2. REST API Endpoints
        if url.startswith('/api/'):
            db = load_database()

            if url == '/api/health':
                return self.send_json(200, {"status": "ok", "time": time.time()})

            if url == '/api/gigs' or url == '/api/tasks':
                return self.send_json(200, {"gigs": db.get("gigs", [])})

            if url == '/api/students':
                return self.send_json(200, {"students": db.get("students", [])})

            if url == '/api/customers':
                return self.send_json(200, {"customers": db.get("customers", [])})

            if url == '/api/revenue':
                return self.send_json(200, {"revenue": db.get("revenue", [])})

            if url == '/api/about' or url == '/api/founder':
                return self.send_json(200, {"founder": db.get("founder", {})})

            if url == '/api/feedbacks':
                return self.send_json(200, {"feedbacks": db.get("feedbacks", [])})

            return self.send_json(404, {"error": "API Endpoint Not Found"})

        # Serve static files for all non-API paths
        return super().do_GET()

    def do_POST(self):
        url = self.path.split('?')[0]
        length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(length) if length > 0 else b'{}'
        
        try:
            body = json.loads(post_data.decode('utf-8'))
        except Exception:
            body = {}

        db = load_database()

        # API Handler Router
        if url == '/api/gigs' or url == '/api/tasks':
            # Create new Task or Quick Task
            new_gig = {
                "id": f"gig-{int(time.time()*1000)}",
                "title": body.get("title", "Untitled Task"),
                "category": body.get("category", "General"),
                "isQuickTask": body.get("category") == "Quick Task" or "30 Min" in body.get("hours", "") or "40 Min" in body.get("hours", ""),
                "employerId": body.get("employerId", "cust-501"),
                "employerName": body.get("employerName", "Consumer Employer"),
                "employerRating": body.get("employerRating", 5.0),
                "location": body.get("location", "Campus Area"),
                "pay": int(body.get("pay", 500)),
                "hours": body.get("hours", "1 Hour"),
                "description": body.get("description", ""),
                "status": "Active",
                "applicants": []
            }
            db.setdefault("gigs", []).insert(0, new_gig)
            save_database(db)
            broadcast_event("task_posted", new_gig)
            return self.send_json(200, {"success": True, "gig": new_gig})

        elif url == '/api/tasks/apply' or url == '/api/gigs/apply':
            gig_id = body.get("gigId")
            student_id = body.get("studentId")

            for g in db.get("gigs", []):
                if g["id"] == gig_id:
                    if student_id not in g.get("applicants", []):
                        g.setdefault("applicants", []).append(student_id)

            for s in db.get("students", []):
                if s["id"] == student_id:
                    if gig_id not in s.get("appliedGigs", []):
                        s.setdefault("appliedGigs", []).append(gig_id)

            save_database(db)
            broadcast_event("task_applied", {"gigId": gig_id, "studentId": student_id})
            return self.send_json(200, {"success": True, "gigId": gig_id})

        elif url == '/api/register/student':
            student_data = body
            student_data["id"] = f"std-{int(time.time()*1000)}"
            student_data["feeStatus"] = "Unpaid"
            student_data["idStatus"] = "Pending"
            student_data["walletBalance"] = 0
            student_data["rating"] = 5.0
            student_data["reviewsCount"] = 0
            student_data["joinedDate"] = time.strftime("%d %b %Y")
            student_data["appliedGigs"] = []

            return self.send_json(200, {"success": True, "student": student_data})

        elif url == '/api/pay-fee':
            student_draft = body.get("student")
            txn_id = f"TXN-ROACH-{int(time.time())}"

            if student_draft:
                student_draft["txnId"] = txn_id
                student_draft["feeStatus"] = "Paid ₹299"
                student_draft["idStatus"] = "Approved" # Auto-Approved upon payment!
                
                db.setdefault("students", []).insert(0, student_draft)

            # Revenue log
            rev_entry = {
                "txnId": txn_id,
                "studentName": student_draft.get("name", "Student") if student_draft else "Student",
                "contact": student_draft.get("phone", "") if student_draft else "",
                "amount": 299,
                "method": body.get("method", "UPI").upper(),
                "date": time.strftime("%d %b %Y, %H:%M")
            }
            db.setdefault("revenue", []).insert(0, rev_entry)
            save_database(db)

            broadcast_event("student_paid", {"student": student_draft, "revenue": rev_entry})
            return self.send_json(200, {"success": True, "student": student_draft, "txnId": txn_id})

        elif url == '/api/students/id-status':
            student_id = body.get("studentId")
            new_status = body.get("status", "Approved")

            for s in db.get("students", []):
                if s["id"] == student_id:
                    s["idStatus"] = new_status

            save_database(db)
            broadcast_event("id_status_changed", {"studentId": student_id, "status": new_status})
            return self.send_json(200, {"success": True, "studentId": student_id, "status": new_status})

        elif url == '/api/about' or url == '/api/founder':
            founder_data = body
            db["founder"] = founder_data
            save_database(db)
            broadcast_event("founder_updated", founder_data)
            return self.send_json(200, {"success": True, "founder": founder_data})

        elif url == '/api/feedback':
            fb = body
            fb["date"] = time.strftime("%d %b %Y")
            db.setdefault("feedbacks", []).insert(0, fb)
            save_database(db)
            broadcast_event("feedback_submitted", fb)
            return self.send_json(200, {"success": True, "feedback": fb})

        elif url == '/api/forgot-password':
            email = body.get("email")
            return self.send_json(200, {"success": True, "message": f"Password reset link sent to {email}"})

        return self.send_json(404, {"error": "POST Endpoint Not Found"})

class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    """Threaded HTTP Server handling multiple concurrent real-time requests & SSE clients."""
    daemon_threads = True

def run_server():
    load_database()
    server_address = ('', PORT)
    httpd = ThreadedHTTPServer(server_address, RoachUpRequestHandler)
    print(f"🚀 RoachUp Full-Stack Real-Time Server running live on http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        httpd.server_close()

if __name__ == '__main__':
    run_server()

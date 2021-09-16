# Glide Frontend Proxy

## Separation Stage

1. [x] Use node server to proxy anything, include API and view. modify the js entry to local.
2. [x] Support HTTPS, because proxy target is https.
3. [ ] auth 302 issue and auth state sync.
4. [ ] add new page demo without backend dependencies.
5. [ ] move exist backend route to node server progressively.
6. [ ] remove stats.json that backend dependent.

## Backend entries

`get_entry()` in webapp

- admin
- auth
- entry
- public
- help_center

`render_template` in webapp

- `webapp\web\app.py` `render_template('csrf_error.html')`
- `webapp\web\auth\views.py` `render_template('logged_out.html')`
- `webapp\web\auth\views.py` `render_template('logged_in.html')`
- `webapp\web\auth\views.py` `render_template('mobile_register.html')`
- `webapp\web\auth\views.py` `render_template('public.html')`
- `webapp\web\help_center\views.py` `render_template('help_center/article_box.html')`

const snippets={
query:`SELECT u.name, COUNT(t.id) AS transaction_count,\n       SUM(t.amount) AS total_amount\nFROM users u\nJOIN transactions t ON t.user_id = u.id\nGROUP BY u.id, u.name\nHAVING SUM(t.amount) > 10000\nORDER BY total_amount DESC;`,
trigger:`CREATE TRIGGER reverse_expired_payment\nAFTER UPDATE ON payments\nFOR EACH ROW\nBEGIN\n  IF NEW.status = 'EXPIRED' THEN\n    UPDATE accounts\n    SET balance = balance + NEW.amount\n    WHERE id = NEW.account_id;\n  END IF;\nEND;`,
join:`SELECT e.employee_name,\n       d.department_name,\n       p.performance_score\nFROM employees e\nJOIN departments d\n  ON e.department_id = d.id\nLEFT JOIN performance p\n  ON p.employee_id = e.id\nWHERE e.active = 1\nORDER BY p.performance_score DESC;`
};
const block=document.getElementById('codeBlock');
function show(tab){block.textContent=snippets[tab];document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab))}
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>show(b.dataset.tab)));
document.getElementById('copyBtn').addEventListener('click',async()=>{await navigator.clipboard.writeText(block.textContent);const b=document.getElementById('copyBtn');b.textContent='Copied ✓';setTimeout(()=>b.textContent='Copy code',1200)});
show('query');
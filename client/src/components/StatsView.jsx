
export const StatsViewer = () => {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState(null);
  const fetchStats = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/shorturls/${code}`);
      setStats(res.data);
    } catch (err) {
      alert("Failed to fetch stats");
    }
  };
  return (
    <div className="stats-viewer">
      <h2>URL Stats Viewer</h2>
      <input
        type="text"
        placeholder="Enter shortcode"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={fetchStats}>Get Stats</button>
      {stats && (
        <div className="stats-result">
          <p><strong>Original URL:</strong> {stats.url}</p>
          <p><strong>Created At:</strong> {new Date(stats.createdAt).toLocaleString()}</p>
          <p><strong>Expires At:</strong> {new Date(stats.expiry).toLocaleString()}</p>
          <p><strong>Total Clicks:</strong> {stats.totalClicks}</p>
          <ul>
            {stats.clickDetails.map((click, i) => (
              <li key={i}>
                {new Date(click.timestamp).toLocaleString()} — {click.location} (ref: {click.referrer})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

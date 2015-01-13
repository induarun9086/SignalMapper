cd ..
dev_appserver.cmd --disable_update_check --jvm_flag=-Ddatastore.default_high_rep_job_policy_unapplied_job_pct=20 war
pause